//Writen By Lin, Arranged By Yz
//
tit=[
'<span style="font-weight:bold;font-size:48px;">一　個　懸　疑　故　事</span>',//title
'<div style="width:100%;height:100%;display:table;"><div style="display:table-cell;text-align:center;vertical-align:middle;">[開始遊戲]</div></div>',//start button
'1,7,14,21,28'//preload image page
];
//
lines=[
'<skip/><bg="./BG1.jpg" p="0 -150px" w=800/><bg=""/><div style="text-align:center;"><span style="font-size:3em;" spd=200>一　個　懸　疑　故　事</span></div>',
'<lh=0/><bg="./BG1.jpg" p="0 -150px" w=800 /><next spd=1000/>',
'<lh/><color="#111"/><span style="font-weight:bold;">在劍橋大學的公園裡，張庭瑜被尖銳的匕首畫破喉嚨一刀斃命。</span>',
'<span style="font-weight:bold;">雪地上除了張庭瑜自己的足跡之外，只留下了另外兩個不像是人類腳印的痕跡。</span>',
'<span style="font-weight:bold;">究竟是命運的糾纏，還是感情的糾葛，或者是金錢上的糾紛？\n\n到底兇手是誰？\n\n用什麼手法殺人？</span>',
'<span style="font-weight:bold;">背後是否隱藏著什麼不可告人的祕密呢？\n\n\n\n\n\n讓我們繼續看下去...</span>',
'<bg=""/><color="#333"/><next/>',
'<span spd=300>\u0000</span><div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;" spd=0>嫌疑犯1：葉亞笛</div><img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.1"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.2"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.3"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.4"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.6"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 style="opacity:0.9"/><next spd=50/><keep/>',
'<img src="./C1.jpg" w=300 x=-80 y=80 /><p>主治醫師的女友，因為跟張庭瑜劈腿，被庭瑜以此威脅，</p><p>如果不讓庭瑜下班後使用主治醫師的辦公室吹冷氣，</p><p>就要向主治醫師公開兩人劈腿的內容。因此亞笛對庭瑜產生殺意。</p>',
'<div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;" spd=0>嫌疑犯2：邱昌庭</div><img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.1"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.2"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.3"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.4"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.6"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 style="opacity:0.9"/><next spd=50/><keep/>',
'<img src="./C2.jpg" w=300 x=-80 y=80 /><p>與庭瑜曾是同窗同學，因兩人常在名次上競爭，</p><p>加上女友吳台蘭被庭瑜搶走，所以對庭瑜懷有恨意。</p><p>\n興趣是計算物理算式。</p>',
'<div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;" spd=0>嫌疑犯3：吳台蘭</div><img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.1"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.2"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.3"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.4"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.6"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 style="opacity:0.9"/><next spd=50/><keep/>',
'<img src="./C3.jpg" w=300 x=-80 y=80 /><p>舞台劇團的第一女主角，從小學習芭蕾舞，是公認的第一舞者，</p><p>曾與庭瑜交往一段時間，卻被無情的甩掉，因此對庭瑜怨恨在心。</p>',
'<img src="./C4.jpg" w=300 x=-80 y=80><span style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</span>\n\n  有這些資訊就夠了！',
'<img src="./C4.jpg" w=300 x=-80 y=80><img src="./BG1.jpg" w=300 h=300 x=80 y=80 style="width:300px;height:450px;position:absolute;top:-50px;"><span style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</span>\n\n  張庭瑜死亡現場的照片已經清楚地拍出了兇手犯案的線索！',
'<img src="./C4.jpg" w=300 x=-80 y=80><img src="./BG1.jpg" w=300 h=300 x=80 y=80 style="width:300px;height:450px;position:absolute;top:-50px;"><span style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</span>\n\n  這個線索就是從嫌疑犯中找出兇手的重要證據！',
'<img src="./C4.jpg" w=400 h=400 x=200 y=10><span style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</span>\n\n  就讓我以虛構爺爺的名字發誓，一定要找出殺害庭瑜的兇手！！',
'<skip/><img src="./C1.jpg" w=200 h=330 x=50 y=60 style="width:320px;height:320px;left:-30px;position:absolute;" gt=34><img src="./C2.jpg" w=200 h=330 x=300 y=60 style="width:320px;height:320px;left:-30px;position:absolute;" gt=35><img src="./C3.jpg" w=200 h=330 x=550 y=60 style="width:320px;height:320px;left:-30px;position:absolute;" gt=36><span spd=0>究竟是誰殺了張庭瑜呢？</span>\n\n<a gt=34>[葉亞笛]</a>\n<a gt=35>[邱昌庭]</a>\n<a gt=36>[吳台蘭]</a>\n\n<a gt=33 style="color:#888;font-weight:bold;">[再看一次證據]</a>',
'<skip/><img src="./BG1.jpg" w=400 h=400 x=200 y=10 style="width:400px;height:600px;position:absolute;top:-100px;">\n\n\n\n\n\n<a gt=32 style="color:#888;font-weight:bold;">[選擇犯人]</a>',
'<skip/><div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;">嫌疑犯1：葉亞笛</div><img src="./C1.jpg" w=300 x=-80 y=80/><p>主治醫師的女友，因為跟張庭瑜劈腿，被庭瑜以此威脅，</p><p>如果不讓庭瑜下班後使用主治醫師的辦公室吹冷氣，</p><p>就要向主治醫師公開兩人劈腿的內容。因此亞笛對庭瑜產生殺意。</p><div style="color:#888;font-weight:bold;"><a gt=37>[犯人就是你！]</a>    <a gt=32>[我還要再想想]</a></div>',
'<skip/><div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;">嫌疑犯2：邱昌庭</div><img src="./C2.jpg" w=300 x=-80 y=80/><p>與庭瑜曾是同窗同學，因兩人常在名次上競爭，</p><p>加上女友吳台蘭被庭瑜搶走，所以對庭瑜懷有恨意。</p><p>興趣是計算物理算式。</p><div style="color:#888;font-weight:bold;"><a gt=37>[犯人就是你！]</a>    <a gt=32>[我還要再想想]</a></div>',
'<skip/><div style="color:#F05959;font-weight:bold;margin-bottom:0.8em;">嫌疑犯3：吳台蘭</div><img src="./C3.jpg" w=300 x=-80 y=80/><p>舞台劇團的第一女主角，從小學習芭蕾舞，是公認的第一舞者，</p><p>曾與庭瑜交往一段時間，卻被無情的甩掉，因此對庭瑜怨恨在心。</p><p> </p><div style="color:#888;font-weight:bold;"><a gt=38>[犯人就是你！]</a>    <a gt=32>[我還要再想想]</a></div>',
'<img src="./C4.jpg" w=300 x=-80 y=80><span style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</span>\n\n  抓錯人了，你的推理能力不夠喔。\n\n\n\n<div style="text-align:right;"><a gt=1 style="color:#666">[重頭來過]</a></div>',
'<img src="./C4.jpg" w=300 x=-80 y=80><div style="color:#6666E5;font-weight:bold;" spd=0>金甲一：</div><p>  沒錯！兇手就是吳台蘭！</p>',
'<img src="./C4.jpg" w=300 x=-80 y=80><div style="color:#6666E5;font-weight:bold;margin-bottom:0.8em;" spd=0>金甲一：</div><p>吳台蘭先假裝腳部受傷，誘使庭瑜背著她走入公園後，</p><p>拿出藏在身上的匕首從後面劃破庭瑜的喉嚨，</p><p>接著再利用從小學習的芭蕾舞技巧，</p><p>使用腳趾尖端小心翼翼地從雪地上不留足跡地離開公園。</p>',
'<div style="text-align:center;"><span style="font-size:3em;" spd=200>成　功　破　案　！</span></div>\n\n\n<div style="text-align:right;"><a style="color:#666;" gt>[再玩一次]</a></div>',
'<reset/>'
];