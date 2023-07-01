import matplotlib.pyplot as plt


def get_req_xp(level: int):
    return 150 * (pow(level, 2) + level)

plot_points = [get_req_xp(x) for x in range(100)]
plt.plot(plot_points)

plt.xlabel("Level")
plt.ylabel("XP required")
plt.show()
