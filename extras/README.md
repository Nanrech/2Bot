# auto_backup
This is the script I use to create backups of the xp database. A copy of the current working xp table is created, the backup table is replaced with that copy, and a local copy is stored in my computer.

# xp.txt
This file contains the amount of xp needed per level, from level 0 to level 300, formatted as "level -> xp".
The formula for calculating the xp required per level is:
```
function getReqXP(l) {
  return (150 * (Math.pow(l, 2) + l));
}
```

# A fun fact
Before this bot was created, the server (sb duo) used a different bot. That bot worked flawlessly for a long time, but one day its database exploded without previous warning and all the xp data (backups included) were completely lost. Because of this, I was tasked with creating this bot, which would also contain the functionality of a different, personalized bot that was unique to the server (DuoBot).
After it was created, everyone started with 0 xp, so I tried to change that.

The previous bot was kind enough to give everyone a level role whenever they reached certain milestones, so what I did was:
- Go through every member of the server
- Grab their roles
- Get the highest level role
- Calculate amount of xp needed to reach that role (the previous scaling formula wasn't lost)
- Add all that xp to that member

This solution wasn't perfect. People with more than X levels were set back to the nearest (rounding down) level, so a level 95 would be turned into a level 90 and so on. People didn't really care that much about that, so I didn't do anything about it.
