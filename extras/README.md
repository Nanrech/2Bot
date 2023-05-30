# mass_xp.js
Before this bot was a thing there was a different one. Tons of people got XP (and thus, level roles) from it before it tragically exploded.
After we installed this one, there were a ton of people who had kept their level roles but none of the XP so internally they were a much lower level than they should have been. To fix this, I created this little script.

It's a simple solution. It loops through all server members and, if they have a level role that's lower than the level recorded in the database, the amount of XP required to get to that level is applied to them.
In my case, I was way above level 100 (level roles only go up to 100, so that was my highest one) but internally I was a lot lower. When the bot arrived at my profile, it saw that I had the level 100 role but less than `getReqXP(100) = 1,515,000`, so it went ahead and set my XP to 1,515,000.

This was the case for ~200 members.

# xp_level_plot.py, xp_level_plot.png & xp_level_plot2.png
Silly little plots to showcase XP scaling.