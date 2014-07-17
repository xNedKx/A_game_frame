lines=[
'<audio="http://sampleswap.org/mp3/artist/brettml/Seed-AI_2D-320.mp3" bg l /><div style="text-align:center;font-size:3em;font-weight:nold;">測　試　展　示　程　式</div><var n="loop" v="-1" />',
'<skip /><var n="n" v=rnd /><var n="n" v="*3" /><var n="na" v="王大同" /><if n="n" c="ME" v="1"><var n="na" v="林小明" /><if n="n" c="ME" v="2"><var n="na" v="吳鳴世" /></if></if><div>該怎麼稱呼您呢？ <input n="name" maxL=12 v=na /><if n="na" c="E" v=name gt=1 /><div style="float:right;"><a gt=1>[換個名子看看]</a><a gt>[確認]</a></div><div style="clear:both"></div></div>',
'<div>迴圈測試</div><p><var n="name" s />，您好。</p><p>LOOP: <var n="loop" v="+1" s /></p><p><if n="loop" c="ME" v="5">繞5次囉～<if n="loop" c="ME" v="10"> 別再繞啦～</if></if></p>',
'<div><var n="name" s />，您要？</div><p><a gt=2>[進入迴圈]</a></p><p> </p><p><a gt>[離開迴圈]</a></p>',
'<div>尚未新增其他測試。</div><p><var n="name" s /> 掰掰～</p>'
];