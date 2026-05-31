import argparse
import asyncio
import threading

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation
from scipy.spatial.transform import Rotation as R

from SiriusCeption_Teleop import SiriusCeptionTeleop, SiriusCeptionTeleopWithGripper
from udp_imu_server import UDPIMUServer


def start_udp_server(server_holder, ready_evt, ip, port):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    server = UDPIMUServer(ip=ip, port=port)
    server_holder["server"] = server
    loop.create_task(server.start())
    ready_evt.set()
    loop.run_forever()


def _axis_endpoints(r_mat, origin, axis_len):
    ex = r_mat @ np.array([1.0, 0.0, 0.0]) * axis_len
    ey = r_mat @ np.array([0.0, 1.0, 0.0]) * axis_len
    ez = r_mat @ np.array([0.0, 0.0, 1.0]) * axis_len
    return origin + ex, origin + ey, origin + ez


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--upper-id", type=int, required=True)
    parser.add_argument("--fore-id", type=int, required=True)
    parser.add_argument("--hand-id", type=int, required=True)

    # 可选：如果提供 finger-id，则启用 gripper 模式
    parser.add_argument("--finger-id", type=int, default=None)

    parser.add_argument("--l-upper", type=float, required=True)
    parser.add_argument("--l-fore", type=float, required=True)
    parser.add_argument("--init-pose", default="forward")
    parser.add_argument("--earth-frame", default="SEU")
    parser.add_argument("--world-heading-deg", type=float, default=0.0)
    parser.add_argument("--earth-z-ccw-deg", type=float, default=0.0)
    parser.add_argument("--base-offset", type=float, nargs=3, default=(0.0, 0.0, 0.0))
    parser.add_argument("--calib-duration", type=float, default=3.0)
    parser.add_argument("--rate-hz", type=float, default=20.0)
    parser.add_argument("--ip", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=9999)

    # gripper 映射参数
    parser.add_argument("--grip-angle-min-deg", type=float, default=20.0)
    parser.add_argument("--grip-angle-max-deg", type=float, default=70.0)
    parser.add_argument("--gripper-min-deg", type=float, default=0.0)
    parser.add_argument("--gripper-max-deg", type=float, default=180.0)

    # 可选：指定掌背和手指的“骨段方向轴”
    parser.add_argument("--hand-axis-local", type=float, nargs=3, default=(1.0, 0.0, 0.0))
    parser.add_argument("--finger-axis-local", type=float, nargs=3, default=(1.0, 0.0, 0.0))

    args = parser.parse_args()

    server_holder = {}
    ready_evt = threading.Event()
    t = threading.Thread(
        target=start_udp_server,
        args=(server_holder, ready_evt, args.ip, args.port),
        daemon=True,
    )
    t.start()
    ready_evt.wait()
    server = server_holder["server"]

    use_gripper = args.finger_id is not None

    if use_gripper:
        teleop = SiriusCeptionTeleopWithGripper(
            imu_server=server,
            upper_id=args.upper_id,
            fore_id=args.fore_id,
            hand_id=args.hand_id,
            finger_id=args.finger_id,
            l_upper=args.l_upper,
            l_fore=args.l_fore,
            init_pose=args.init_pose,
            earth_frame=args.earth_frame,
            world_heading_deg=args.world_heading_deg,
            earth_z_ccw_deg=args.earth_z_ccw_deg,
            base_offset=args.base_offset,
            grip_angle_min_deg=args.grip_angle_min_deg,
            grip_angle_max_deg=args.grip_angle_max_deg,
            gripper_min_deg=args.gripper_min_deg,
            gripper_max_deg=args.gripper_max_deg,
        )
    else:
        teleop = SiriusCeptionTeleop(
            server,
            args.upper_id,
            args.fore_id,
            args.hand_id,
            args.l_upper,
            args.l_fore,
            init_pose=args.init_pose,
            earth_frame=args.earth_frame,
            world_heading_deg=args.world_heading_deg,
            earth_z_ccw_deg=args.earth_z_ccw_deg,
            base_offset=args.base_offset,
        )

    asyncio.run(teleop.calibrate(args.calib_duration))

    fig = plt.figure()
    ax = fig.add_subplot(111, projection="3d")
    title = "SiriusCeption Teleop (4 IMUs + Gripper)" if use_gripper else "SiriusCeption Teleop (3 Joints Pose)"
    ax.set_title(title)
    ax.set_xlim(-1.2, 1.2)
    ax.set_ylim(-1.2, 1.2)
    ax.set_zlim(-1.2, 1.2)
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_zlabel("Z")

    euler_text = ax.text2D(0.02, 0.95, "hand_R euler_xyz_deg: N/A", transform=ax.transAxes)

    grip_angle_text = None
    gripper_text = None
    if use_gripper:
        grip_angle_text = ax.text2D(0.02, 0.90, "grip_angle_deg: N/A", transform=ax.transAxes)
        gripper_text = ax.text2D(0.02, 0.85, "gripper_deg: N/A", transform=ax.transAxes)

    # World axes
    ax.plot([0, 0.8], [0, 0], [0, 0], color="r")
    ax.plot([0, 0], [0, 0.8], [0, 0], color="g")
    ax.plot([0, 0], [0, 0], [0, 0.8], color="b")

    # Link lines
    link1, = ax.plot([0, 0], [0, 0], [0, 0], color="k", linewidth=2)
    link2, = ax.plot([0, 0], [0, 0], [0, 0], color="k", linewidth=2)

    # Joint markers
    sh_pt, = ax.plot([0], [0], [0], marker="o", color="k")
    el_pt, = ax.plot([0], [0], [0], marker="o", color="k")
    ha_pt, = ax.plot([0], [0], [0], marker="o", color="k")

    axis_len = 0.2

    # Shoulder axes
    sh_x, = ax.plot([0, axis_len], [0, 0], [0, 0], color="r", linewidth=2)
    sh_y, = ax.plot([0, 0], [0, axis_len], [0, 0], color="g", linewidth=2)
    sh_z, = ax.plot([0, 0], [0, 0], [0, axis_len], color="b", linewidth=2)

    # Elbow axes
    el_x, = ax.plot([0, axis_len], [0, 0], [0, 0], color="r", linewidth=2)
    el_y, = ax.plot([0, 0], [0, axis_len], [0, 0], color="g", linewidth=2)
    el_z, = ax.plot([0, 0], [0, 0], [0, axis_len], color="b", linewidth=2)

    # Hand axes
    ha_x, = ax.plot([0, axis_len], [0, 0], [0, 0], color="r", linewidth=2)
    ha_y, = ax.plot([0, 0], [0, axis_len], [0, 0], color="g", linewidth=2)
    ha_z, = ax.plot([0, 0], [0, 0], [0, axis_len], color="b", linewidth=2)

    def update(_):
        if use_gripper:
            try:
                (
                    positions,
                    r_up,
                    r_fore_abs,
                    _,
                    r_hand,
                    _,
                    grip_angle_deg,
                    gripper_deg,
                ) = teleop.compute_full()
            except Exception:
                euler_text.set_text("hand_R euler_xyz_deg: N/A")
                grip_angle_text.set_text("grip_angle_deg: N/A")
                gripper_text.set_text("gripper_deg: N/A")
                return (
                    link1, link2, sh_pt, el_pt, ha_pt,
                    sh_x, sh_y, sh_z, el_x, el_y, el_z, ha_x, ha_y, ha_z,
                    euler_text, grip_angle_text, gripper_text
                )
        else:
            try:
                positions, r_up, r_fore_abs, _, r_hand = teleop.compute_full()
            except Exception:
                euler_text.set_text("hand_R euler_xyz_deg: N/A")
                return (
                    link1, link2, sh_pt, el_pt, ha_pt,
                    sh_x, sh_y, sh_z, el_x, el_y, el_z, ha_x, ha_y, ha_z, euler_text
                )

        p_sh, p_el, p_ha = positions
        euler = R.from_matrix(r_hand).as_euler("xyz", degrees=True)
        euler_text.set_text(
            f"hand_R euler_xyz_deg: [{euler[0]:.1f}, {euler[1]:.1f}, {euler[2]:.1f}]"
        )

        if use_gripper:
            grip_angle_text.set_text(f"grip_angle_deg: {grip_angle_deg:.1f}")
            gripper_text.set_text(f"gripper_deg: {gripper_deg:.1f}")

        # Links
        link1.set_data([p_sh[0], p_el[0]], [p_sh[1], p_el[1]])
        link1.set_3d_properties([p_sh[2], p_el[2]])
        link2.set_data([p_el[0], p_ha[0]], [p_el[1], p_ha[1]])
        link2.set_3d_properties([p_el[2], p_ha[2]])

        # Joint points
        sh_pt.set_data([p_sh[0]], [p_sh[1]])
        sh_pt.set_3d_properties([p_sh[2]])
        el_pt.set_data([p_el[0]], [p_el[1]])
        el_pt.set_3d_properties([p_el[2]])
        ha_pt.set_data([p_ha[0]], [p_ha[1]])
        ha_pt.set_3d_properties([p_ha[2]])

        # Axes at joints
        sh_ex, sh_ey, sh_ez = _axis_endpoints(r_up, p_sh, axis_len)
        el_ex, el_ey, el_ez = _axis_endpoints(r_fore_abs, p_el, axis_len)
        ha_ex, ha_ey, ha_ez = _axis_endpoints(r_hand, p_ha, axis_len)

        sh_x.set_data([p_sh[0], sh_ex[0]], [p_sh[1], sh_ex[1]])
        sh_x.set_3d_properties([p_sh[2], sh_ex[2]])
        sh_y.set_data([p_sh[0], sh_ey[0]], [p_sh[1], sh_ey[1]])
        sh_y.set_3d_properties([p_sh[2], sh_ey[2]])
        sh_z.set_data([p_sh[0], sh_ez[0]], [p_sh[1], sh_ez[1]])
        sh_z.set_3d_properties([p_sh[2], sh_ez[2]])

        el_x.set_data([p_el[0], el_ex[0]], [p_el[1], el_ex[1]])
        el_x.set_3d_properties([p_el[2], el_ex[2]])
        el_y.set_data([p_el[0], el_ey[0]], [p_el[1], el_ey[1]])
        el_y.set_3d_properties([p_el[2], el_ey[2]])
        el_z.set_data([p_el[0], el_ez[0]], [p_el[1], el_ez[1]])
        el_z.set_3d_properties([p_el[2], el_ez[2]])

        ha_x.set_data([p_ha[0], ha_ex[0]], [p_ha[1], ha_ex[1]])
        ha_x.set_3d_properties([p_ha[2], ha_ex[2]])
        ha_y.set_data([p_ha[0], ha_ey[0]], [p_ha[1], ha_ey[1]])
        ha_y.set_3d_properties([p_ha[2], ha_ey[2]])
        ha_z.set_data([p_ha[0], ha_ez[0]], [p_ha[1], ha_ez[1]])
        ha_z.set_3d_properties([p_ha[2], ha_ez[2]])

        if use_gripper:
            return (
                link1, link2, sh_pt, el_pt, ha_pt,
                sh_x, sh_y, sh_z, el_x, el_y, el_z, ha_x, ha_y, ha_z,
                euler_text, grip_angle_text, gripper_text
            )

        return (
            link1, link2, sh_pt, el_pt, ha_pt,
            sh_x, sh_y, sh_z, el_x, el_y, el_z, ha_x, ha_y, ha_z, euler_text
        )

    interval_ms = int(1000 / args.rate_hz)
    anim = FuncAnimation(fig, update, interval=interval_ms, blit=False)
    plt.show()
    return anim


if __name__ == "__main__":
    main()