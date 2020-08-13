
/**
 * 新手引导配置
 */
namespace RookieCfg 
{
	/**
	 * 新手引导配置
	 * "nextId" 下一步ID
	 * "nameId"  标题ID 
	 * "descId" 描述ID
	 * "personPic"  人物形象的图片名   1,是自己
	 * "bgId" 背景图片ID
	 * 	"clickRect" 点击区域 {"y":645,"x":42,"h":122,"w": 150}
	 * 	"tipText"  悬浮提示文字
	 * 	delayTime  延迟 显示
	 * clickContinue 文字逐字弹射，点击瞬间全显示。
	 * needPush 下一步通知
	 * needPush2 阶段结束通知
	 * "touchAll" 点击任何区域跳下一步，包括rect
	 * clickToNext 点击guideBg灰色区域也可跳下一步，不包括rect
	 * guideBgAlpha 设置灰色区域透明度
	 */
	let isNeedCheck:boolean = true;
	export let rookieCfg:any = {

		"storyEndId":"26",
		"storyEndId2":"14",
		"storyStartId2":"15",
		"guideStartId":"101",
		"guideEndId":"128",
		"storyMusicStart":"4",
		"storyMusicEnd":"11",
		"guideSteps":73,
		"fogId":"1",
		"shakeId":"4",
		//做梦
		"1":{"guideId":14,"nextId":"2", "descId":1, "bgId":9,"nameId":"storyNPCName30","clickContinue":true},
		"2":{"guideId":15,"nextId":"3", "descId":2, "bgId":9,"clickContinue":true},
		"3":{"guideId":16,"nextId":"4", "descId":3, "bgId":9,"clickContinue":true},
		//破屋
		"4":{"guideId":17,"nextId":"5", "descId":4, "bgId":2,"clickContinue":true},
		"5":{"guideId":18,"nextId":"6", "descId":5, "bgId":2,"clickContinue":true,},
		"6":{"guideId":19,"nextId":"7", "descId":6, "bgId":2,"personPic":999,"nameId":"storyNPCName1","clickContinue":true,},
		// 分支
		"7":{"guideId":20,"bgId":2,"branchMale":{"1":"8","2":"8"},"branch":{"1":"8","2":"8"},"clickContinue":false,"nextId":"8"},
		"8":{"guideId":21,"nextId":"9", "descId":8, "bgId":2,"clickContinue":true,},
		"9":{"guideId":22,"nextId":"10", "descId":9, "bgId":1,"personPic":999,"nameId":"storyNPCName1","clickContinue":true,},
		"10":{"guideId":23,"nextId":"11", "descId":10, "bgId":1,"personPic":"wife_full_101","nameId":"wifeName_101","clickContinue":true,},
		//发榜
		"11":{"guideId":24,"nextId":"12", "descId":11, "bgId":4,"clickContinue":true,},
		"12":{"guideId":25,"nextId":"13", "descId":12, "bgId":5,"clickContinue":true,},
		//婚礼
		"13":{"guideId":26,"nextId":"14", "descId":13, "bgId":7,"clickContinue":true,},
		"14":{"guideId":27,"nextId":"14_1", "descId":14, "bgId":7,"clickContinue":true,"isCallback":true,},
		//红颜
		"14_1":{"guideId":28,"nextId":"14_2", "clickRect":{"x":530,"y":370,"w":130,"h":270,"fromBottom":670},"handPos":{x:575,y:500,"fromBottom":558},"isScenePos":"homeScene","sceneKey":"wife","scrollx":660},//箭头指向红颜NPC
		"14_2":{"guideId":29,"nextId":"14_3", "clickRect":{"x":138,"y":692,"w":175,"h":40},"tipId":"wife_2","tipPos":{x:130,y:460},"touchAll":true},//圈红颜亲密度
		"14_3":{"guideId":30,"nextId":"14_4", "clickRect":{"x":270,"y":692,"w":175,"h":40},"tipId":"wife_3","tipPos":{x:130,y:460},"touchAll":true},//圈红颜魅力
		"14_4":{"guideId":31,"nextId":null, "clickRect":{"x":411,"y":318,"w":170,"h":70,"fromBottom":80},"handPos":{x:520,y:500,"fromBottom":42,"flipXY":true},"tipId":"wife_4","tipPos":{x:130,y:660},"waitNext":"14_5"},//圈随机传唤
		"14_5":{"guideId":32,"nextId":"15", "clickRect":{"x":580,"y":12,"w":60,"h":60},"handPos":{x:612,y:45,"flip":true},"checkNpc":"manage"},//箭头指向关闭按钮
		//府邸
		"15":{"guideId":33,"nextId":"16", "descId":15, "bgId":6,"clickContinue":true,},
		"16":{"guideId":34,"nextId":"17", "descId":16, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		"17":{"guideId":35,"nextId":"18", "descId":17, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		"18":{"guideId":36,"nextId":"19", "descId":18, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		"19":{"guideId":37,"nextId":"20", "descId":19, "bgId":6,"clickContinue":true,},
		"20":{"guideId":38,"nextId":"21", "descId":20, "bgId":6,"clickContinue":true,},

		"21":{"guideId":39,"nextId":"22", "descId":21, "bgId":6,"personPic":"servant_full_1002","nameId":"servant_name1002","clickContinue":true,},
		"22":{"guideId":40,"nextId":"23", "descId":22, "bgId":6,"personPic":"servant_full_1003","nameId":"servant_name1003","clickContinue":true,},
		"23":{"guideId":41,"nextId":"24", "descId":23, "bgId":6,"personPic":"servant_full_1004","nameId":"servant_name1004","clickContinue":true,},
		"24":{"guideId":42,"nextId":"25", "descId":24, "bgId":6,"personPic":"servant_full_1005","nameId":"servant_name1005","clickContinue":true,},
		"25":{"guideId":43,"nextId":"26", "descId":25, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		"26":{"guideId":44,"nextId":"101", "descId":26, "bgId":6,"clickContinue":true,"waitNext":101},
		
		
		// "27":{"guideId":18,"nextId":"28", "descId":27, "bgId":2,"personPic":999,"nameId":"storyNPCName1","clickContinue":true,},
		// "28":{"guideId":19,"nextId":"29", "descId":28, "bgId":2,"personPic":"story_man2","nameId":"storyNPCName26","clickContinue":true,},
		// "29":{"guideId":20,"nextId":"30", "descId":29, "bgId":3,"clickContinue":true,},
		// "30":{"guideId":21,"nextId":"31", "descId":30, "bgId":3,"clickContinue":true},
		// "31":{"guideId":22,"nextId":"32", "descId":31, "bgId":4,"clickContinue":true},
		// "32":{"guideId":23,"nextId":"33", "descId":32, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true},
		// "33":{"guideId":24,"nextId":"34", "descId":33, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
		// "34":{"guideId":25,"nextId":"33_1", "descId":34, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		// "35":{"guideId":30,"nextId":"36", "descId":35, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
		// "36":{"guideId":31,"nextId":"37", "descId":36, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
		// "37":{"guideId":32,"nextId":"38", "descId":37, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		// "38":{"guideId":33,"nextId":"39", "descId":38, "bgId":6,"clickContinue":true},
				
				
		// "33_1":{"guideId":26,"bgId":5,"branch":{"3":"33_2","4":"33_6"},"clickContinue":false,"nextId":"33_2"},
		// // 分支1	
		// "33_2":{"guideId":27,"nextId":"33_3", "descId":3401, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		// "33_3":{"guideId":28,"nextId":"33_4", "descId":3402, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		// "33_4":{"guideId":29,"nextId":"33_5", "descId":3403, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		// "33_5":{"guideId":30,"nextId":"39", "descId":3404, "bgId":6,"clickContinue":true},
		// // 分支2	
		// "33_6":{"guideId":27,"nextId":"33_7", "descId":3405, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		// "33_7":{"guideId":28,"nextId":"33_8", "descId":3406, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
		// "33_8":{"guideId":29,"nextId":"33_9", "descId":3407, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		// "33_9":{"guideId":30,"nextId":"39", "descId":3408, "bgId":6,"clickContinue":true},

		// "39":{"guideId":31,"nextId":"40", "descId":39, "bgId":6,"personPic":"servant_full_1002","nameId":"servant_name1002","clickContinue":true,},
		// "40":{"guideId":32,"nextId":"41", "descId":40, "bgId":6,"personPic":"servant_full_1003","nameId":"servant_name1003","clickContinue":true},
		// "41":{"guideId":33,"nextId":"42", "descId":41, "bgId":6,"personPic":"servant_full_1004","nameId":"servant_name1004","clickContinue":true},
		// "42":{"guideId":34,"nextId":"43", "descId":42, "bgId":6,"personPic":"servant_full_1005","nameId":"servant_name1005","clickContinue":true,},
		// "43":{"guideId":35,"nextId":"44", "descId":43, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
		// "44":{"guideId":36,"nextId":"101", "descId":44, "bgId":6,"clickContinue":true,"isCallback":true,"waitNext":101},

		"101":{"guideId":45,"nextId":"102", "descId":101, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"105"},
		"102":{"guideId":46,"nextId":"103", "clickRect":{"x":290,"y":370,"w":190,"h":350,"fromBottom":550},"handPos":{x:370,y:400,"fromBottom":400},"isScenePos":"homeScene","sceneKey":"manage","scrollx":660},//点营收NPC
		"103":{"guideId":47,"nextId":"104",  "clickRect":{"x":60,"y":423,"w":250,"h":290,"fromBottom":590},"handPos":{x:180,y:580,"fromBottom":440},"tipId":"103","tipPos":{x:160,y:600,"fromBottom":240},},//点经商按钮
		"104":{"guideId":48,"nextId":"105","clickRect":{"x":360,"y":193,"w":250,"h":290,"fromBottom":700},"handPos":{x:460,y:355,"fromBottom":570},"tipId":"104","tipPos":{x:150,y:510,"fromBottom":350},},//点经农按钮
		"105":{"guideId":49,"nextId":"106_1", "clickRect":{"x":365,"y":653,"w":240,"h":320,"fromBottom":440},"handPos":{x:520,y:810,"fromBottom":260},"tipId":"105","tipPos":{x:130,y:450,"fromBottom":540},},//点招兵按钮
		"106_1":{"guideId":50,"nextId":"106", "clickRect":{"x":580,"y":12,"w":60,"h":60},"handPos":{x:617,y:45,"flip":true}},//箭头指向关闭按钮

		"106":{"guideId":51,"nextId":"107", "descId":106, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"109"},
		"107":{"guideId":52,"nextId":"108", "clickRect":{"x":165,"y":850,"w":100,"h":100,"fromBottom":107},"handPos":{x:215,y:900,"fromBottom":73}},//点门客按钮
		"108":{"guideId":53,"nextId":"108_1", "clickRect":{"x":11,"y":102,"w":200,"h":258},"handPos":{x:97,y:230}},//点门客
		"108_exile":{"guideId":53,"nextId":"108_1", "clickRect":{"x":11,"y":160,"w":200,"h":258},"handPos":{x:97,y:280}},//当开启门客出海开关时候--点门客
		"108_1":{"guideId":54,"nextId":"108_2","clickRect":{"x":435,"y":135,"w":200,"h":280},"tipId":"1081","tipPos":{x:130,y:500},"touchAll":true},//圈门客属性
		"108_2":{"guideId":55,"nextId":"108_3", "clickRect":{"x":20,"y":703,"w":600,"h":90},"tipId":"1082","tipPos":{x:130,y:500},"touchAll":true,"needLocalPos":true},//圈门客2本书
		"108_3":{"guideId":56,"nextId":"109", "clickRect":{"x":60,"y":465,"w":510,"h":370,"fromCenter":0.5},"tipId":"1083","tipPos":{x:130,y:170},"touchAll":true,"needPush":true},//圈门客2个升级按钮
		"109":{"guideId":57,"nextId":null, "clickRect":{"x":460,"y":459,"w":160,"h":70},"handPos":{x:530,y:492},"tipId":"109","tipPos":{x:130,y:650},"waitNext":111,"needPush":true,"showCloseHand":true},//点门客升级按钮
		"110":{"guideId":57,"nextId":null,"waitNext":111, "clickRect":{"x":580,"y":12,"w":60,"h":60},"handPos":{x:617,y:45,"flip":true}},//箭头指向关闭按钮

		"111":{"guideId":58,"nextId":"112", "descId":111, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"120"},
		"112":{"guideId":59,"nextId":"113", "clickRect":{"x":10,"y":850,"w":140,"h":100,"fromBottom":107},"handPos":{x:70,y:890,"fromBottom":70}},//箭头指向出府按钮
		//箭头指向关卡
		"113":{"guideId":60,"nextId":"114", "clickRect":{"x":190,"y":580,"w":220,"h":160},"handPos":{x:285,y:660},"isScenePos":"cityScene","sceneKey":"challenge"},
		"113_scroll":{"guideId":50,"nextId":"114", "clickRect":{"x":162,"y":794,"w":316,"h":222, fromBottom:360},"handPos":{x:320,y:794, fromBottom:249}, cityscenescroll:640},//箭头指向关卡
		"114":{"guideId":61,"nextId":"115", "clickRect":{"x":169,"y":645,"w":110,"h":110,"fromCenter":0.5},"handPos":{x:210,y:695,"fromCenter":0.5}},//箭头指向第一个关卡
		
		"115":{"guideId":62,"nextId":"116", "descId":115, "bgId":5,"clickContinue":true,"resEndId":"120"},
		"116":{"guideId":63,"nextId":"117", "descId":116, "bgId":5,"clickContinue":true,},
		"117":{"guideId":64,"nextId":"118", "descId":117, "bgId":5,"personPic":"story_npc_4","nameId":"storyNPCName3","clickContinue":true,},
		"118":{"guideId":65,"nextId":"119", "descId":118, "bgId":5,"personPic":"story_npc_18","nameId":"storyNPCName2","clickContinue":true,},
		"119":{"guideId":66,"nextId":"120", "descId":119, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
		"120":{"guideId":67,"nextId":null, "clickRect":{"x":210,"y":390,"w":220,"h":220,"fromCenter":0.5},"handPos":{x:320,y:500,"fromCenter":0.5},"waitNext":123},//箭头指向开始战斗

		"123":{"guideId":68,"nextId":"124", "descId":123, "bgId":5,"clickContinue":true,"resEndId":"128"},
		"124":{"guideId":69,"nextId":"125", "descId":124, "bgId":5,"personPic":"story_npc_4","nameId":"storyNPCName3","clickContinue":true,},

		"125":{"guideId":70,"nextId":"126", "descId":125, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},

		"126":{"guideId":71,"nextId":"127", "clickRect":{"x":580,"y":12,"w":60,"h":60},"handPos":{x:612,y:45,"flip":true}},//箭头指向关闭按钮
		"127":{"guideId":72,"nextId":"128", "clickRect":{"x":10,"y":850,"w":140,"h":100,"fromBottom":107},"handPos":{x:70,y:890,"fromBottom":70}},//箭头指向回府按钮
		"128":{"guideId":73,"nextId":null, "clickRect":{"x":0,"y":850,"w":230,"h":70,"fromBottom":222},"handPos":{x:73,y:878,"fromBottom":199}},//箭头指向任务按钮


		//分阶段引导
		//红颜
		"wife_1":{"otherId":"wife_1","nextId":"wife_2", "clickRect":{"x":530,"y":370,"w":130,"h":270,"fromBottom":670},"handPos":{x:575,y:500,"fromBottom":558},"isScenePos":"homeScene","sceneKey":"wife","scrollx":660},//箭头指向红颜NPC
		"wife_2":{"otherId":"wife_2","nextId":"wife_3", "clickRect":{"x":138,"y":692,"w":125,"h":40},"tipId":"wife_2","tipPos":{x:130,y:460},"touchAll":true},//圈红颜亲密度
		"wife_3":{"otherId":"wife_3","nextId":"wife_4", "clickRect":{"x":270,"y":692,"w":125,"h":40},"tipId":"wife_3","tipPos":{x:130,y:460},"touchAll":true},//圈红颜魅力
		"wife_4":{"otherId":"wife_4","clickToNext":true,"nextId":null, "clickRect":{"x":400,"y":318,"w":190,"h":70,"fromBottom":80},"handPos":{x:520,y:500,"fromBottom":42,"flipXY":true},"tipId":"wife_4","tipPos":{x:130,y:660}},//圈随机传唤

		//门客

		"servant2_1":{"otherId":"servant2_1","nextId":"servant2_2", "clickRect":{"x":165,"y":850,"w":100,"h":100,"fromBottom":107},"handPos":{x:215,y:900,"fromBottom":73}},//点门客按钮
		"servant2_2":{"otherId":"servant2_2","nextId":"servant2_3", "clickRect":{"x":11,"y":102,"w":200,"h":258},"handPos":{x:97,y:230}},//点门客
		"servant2_2_2":{"otherId":"servant2_2_2","nextId":"servant2_3", "clickRect":{"x":11,"y":160,"w":200,"h":258},"handPos":{x:97,y:280}},//当开启门客出海开关时候--点门客
		"servant2_3":{"otherId":"servant2_3","nextId":"servant2_4","clickRect":{"x":435,"y":135,"w":200,"h":280},"tipId":"1081","tipPos":{x:130,y:500},"touchAll":true},//圈门客属性
		"servant2_4":{"otherId":"servant2_4","nextId":"servant2_5", "clickRect":{"x":20,"y":728,"w":600,"h":90},"tipId":"1082","tipPos":{x:130,y:500},"touchAll":true,"needLocalPos":true},//圈门客2本书
		"servant2_5":{"otherId":"servant2_5","nextId":"servant2_6", "clickRect":{"x":60,"y":465,"w":510,"h":370,"fromCenter":0.5},"tipId":"1083","tipPos":{x:130,y:170},"touchAll":true,"needPush":true},//圈门客2个升级按钮
		"servant2_6":{"otherId":"servant2_6","needPush2":true,"clickToNext":true,"nextId":null, "clickRect":{"x":460,"y":459,"w":160,"h":70},"handPos":{x:530,y:492},"tipId":"109","tipPos":{x:130,y:650},"needPush":true,"showCloseHand":true},//点门客升级按钮
		
		//子嗣
		"child_1":{"otherId":"child_1","nextId":"child_2", "clickRect":{"x":220,"y":350,"w":130,"h":270,"fromBottom":640},"handPos":{x:270,y:400,"fromBottom":508},"isScenePos":"homeScene","sceneKey":"child","scrollx":360},//箭头指向子嗣NPC
		"child_2":{"otherId":"child_2","nextId":"child_3", "clickRect":{"x":14,"y":420,"w":420,"h":90},"tipId":"child_2","tipPos":{x:130,y:600},"touchAll":true},//圈子嗣属性
		"child_3":{"otherId":"child_3","nextId":"child_4","clickRect":{"x":475,"y":470,"w":160,"h":70},"tipId":"child_3","tipPos":{x:130,y:590},"touchAll":true},//圈赐名按钮
		"child_4":{"otherId":"child_4","nextId":"child_5", "clickRect":{"x":170,"y":638,"w":140,"h":40},"tipId":"child_4","tipPos":{x:130,y:500},"touchAll":true},//圈子嗣栏子嗣等级
		"child_5":{"otherId":"child_5","nextId":null,rectAlpha:0,guideBgAlpha:0, "handPos":{x:570,y:467,"flip":true},"clickRect":{"x":475,"y":470,"w":160,"h":70},"clickToNext":true},//赐名按钮
		

		//联姻
		"adult_1":{"otherId":"adult_1","nextId":"adult_2", "clickRect":{"x":100,"y":320,"w":170,"h":220,"fromBottom":690},"handPos":{x:140,y:340,"fromBottom":618},"isScenePos":"homeScene","sceneKey":"adult","scrollx":1054},//箭头指向姻缘
		"adult_2":{"otherId":"adult_2","nextId":"adult_3", "clickRect":{"x":220,"y":698,"w":160,"h":40},"tipId":"adult_2","tipPos":{x:130,y:530},"touchAll":true},//圈子嗣身份
		"adult_3":{"otherId":"adult_3","nextId":"adult_4","clickRect":{"x":405,"y":420,"w":115,"h":115},"tipId":"adult_3","tipPos":{x:130,y:620}},
		"adult_4":{"otherId":"adult_4","nextId":"adult_5", "clickRect":{"x":10,"y":230,"w":620,"h":210},"tipId":"adult_4","tipPos":{x:130,y:510},"touchAll":true,"needPush":true},//圈第一个联姻对象
		"adult_5":{"otherId":"adult_5","nextId":"adult_6", "clickRect":{"x":10,"y":230,"w":620,"h":64,"fromBottom":73},"tipId":"adult_5","tipPos":{x:130,y:510,"fromBottom":400},"touchAll":true,},
		"adult_6":{"otherId":"adult_6","nextId":null,"clickRect":{"x":30,"y":230,"w":130,"h":64,"fromBottom":70},rectAlpha:0,guideBgAlpha:0, "handPos":{x:570,y:467,"fromBottom":400,flipXY:true},"clickToNext":true},//小手

		//寻访
		"search_1":{"otherId":"search_1","nextId":"search_2", "clickRect":{"x":480,"y":300,"w":140,"h":160},"handPos":{x:510,y:370},"isScenePos":"cityScene","sceneKey":"search",cityscenescroll:640},//箭头指向寻访建筑
		"search_2":{"otherId":"search_2","nextId":"search_3", "clickRect":{"x":454,"y":318,"w":180,"h":70,"fromBottom":95},"tipId":"search_2","tipPos":{x:130,y:690},"touchAll":true},//圈寻访按钮
		"search_3":{"otherId":"search_3","nextId":"search_4","needPush":true, "clickRect":{"x":50,"y":313,"w":540,"h":540,"fromCenter":0.5},"tipId":"search_3","tipPos":{x:130,y:220},"touchAll":true},//圈设置运气
		"search_4":{"otherId":"search_4","nextId":null, "needPush":true,"clickRect":{"x":454,"y":318,"w":160,"h":70,"fromBottom":95},rectAlpha:0,guideBgAlpha:0, "handPos":{x:570,y:467,"flip":true,"fromBottom":95},"clickToNext":true},//圈寻访按钮
		//牢房
		"prison_1":{"otherId":"prison_1","nextId":"prison_2", "clickRect":{"x":240,"y":420,"w":150,"h":150},"handPos":{x:310,y:490},"isScenePos":"cityScene","sceneKey":"prison",cityscenescroll:1280},//箭头指向牢房建筑
		"prison_1_scroll":{"otherId":"prison_1","nextId":"prison_2", "clickRect":{"x":260,"y":512,"w":370,"h":190,"fromBottom":448},"handPos":{x:310,y:490,"fromBottom":448},"isScenePos":null,"sceneKey":"prison",cityscenescroll:1280},
		"prison_2":{"otherId":"prison_2","nextId":"prison_3", "clickRect":{"x":40,"y":270,"w":540,"h":500},"tipId":"prison_2","tipPos":{x:130,y:800},"touchAll":true},//圈犯人
		"prison_3":{"otherId":"prison_3","nextId":"prison_4", "clickRect":{"x":113,"y":93,"w":80,"h":80},"tipId":"prison_3","tipPos":{x:130,y:240},"touchAll":true},//圈犯人头像
		"prison_4":{"otherId":"prison_4","nextId":null,"clickRect":{"x":40,"y":270,"w":540,"h":500},rectAlpha:0,guideBgAlpha:0, "handPos":{x:570,y:467,"flip":true},"clickToNext":true},//小手

		//擂台
		"atkrace_1":{"otherId":"atkrace_1","nextId":"atkrace_2", "clickRect":{"x":330,"y":350,"w":190,"h":140},"handPos":{x:410,y:410},"isScenePos":"cityScene","sceneKey":"atkrace",cityscenescroll:0},//箭头指向擂台建筑
		"atkrace_1_scroll":{"otherId":"atkrace_1","nextId":"atkrace_2", "clickRect":{"x":265,"y":560,"w":190,"h":140,"fromBottom":400},"handPos":{x:310,y:490,"fromBottom":448},"isScenePos":null,"sceneKey":"atkrace",cityscenescroll:0},//箭头指向擂台建筑

		"atkrace_2":{"otherId":"atkrace_2","nextId":"atkrace_3", "clickRect":{"x":120,"y":698,"w":400,"h":450,"fromBottom":530},"tipId":"atkrace_2","tipPos":{x:130,y:250},"touchAll":true},//圈中间门客
		
		//点更多
		"atkrace_3":{"otherId":"atkrace_3","nextId":"atkrace_4", "clickRect":{"x":470,"y":698,"w":160,"h":60,"fromBottom":75},"tipId":"atkrace_3","tipPos":{x:130,y:250,"fromBottom":300},"touchAll":true},
		//点来访
		"atkrace_4":{"otherId":"atkrace_4","nextId":"atkrace_5","handPos":{x:570,y:467,"fromBottom":210}, "clickRect":{"x":20,"y":698,"w":130,"h":130,"fromBottom":210}},
		//圈来访
		"atkrace_5":{"otherId":"atkrace_5","nextId":"atkrace_6","clickRect":{"x":50,"y":160,"w":480,"h":70,"fromCenter":0.5},"guideBgAlpha":0.5, "tipId":"atkrace_4","tipPos":{x:130,y:290,"fromCenter":0.5},"touchAll":true},
		//点门客
		"atkrace_6":{"otherId":"atkrace_6","nextId":"atkrace_7", "clickRect":{"x":120,"y":698,"w":400,"h":450,"fromBottom":530},"tipId":"atkrace_5","tipPos":{x:130,y:250},"needPush":true},//圈中间门客
		//圈出战
		"atkrace_7":{"otherId":"atkrace_7","nextId":"atkrace_8","clickRect":{"x":40,"y":742,"w":560,"h":75,"fromCenter":0.5},"tipId":"atkrace_8","tipPos":{x:130,y:620}},

		"atkrace_8":{"otherId":"atkrace_8","nextId":"atkrace_9","clickRect":{"x":22,"y":378,"w":210,"h":70},"tipId":"atkrace_6","tipPos":{x:130,y:480},"touchAll":true,"needPush":true},//属性
		"atkrace_9":{"otherId":"atkrace_9","nextId":"atkrace_10", "clickRect":{"x":10,"y":140,"w":620,"h":210},"tipId":"atkrace_7","tipPos":{x:130,y:410},"touchAll":true,"needPush":true},//圈上面3个门客
		"atkrace_10":{"otherId":"atkrace_10","nextId":null, "clickRect":{"x":10,"y":140,"w":210,"h":210},rectAlpha:0,guideBgAlpha:0,"handPos":{x:570,y:467},"clickToNext":true},//小手
		
		//酒楼
		"dinner_1":{"otherId":"dinner_1","nextId":"dinner_2", "clickRect":{"x":430,"y":530,"w":200,"h":160},"handPos":{x:530,y:610},"isScenePos":"cityScene","sceneKey":"dinner",cityscenescroll:910},//箭头指向酒楼建筑
		"dinner_2":{"otherId":"dinner_2","nextId":"dinner_3", "clickRect":{"x":230,"y":300,"w":180,"h":150},"tipId":"dinner_2","tipPos":{x:130,y:500},"touchAll":true},//圈进入宴会
		"dinner_3":{"otherId":"dinner_3","nextId":"dinner_4","clickRect":{"x":50,"y":600,"w":540,"h":250},"tipId":"dinner_3","tipPos":{x:130,y:440},"touchAll":true},//圈桌子区
		"dinner_4":{"otherId":"dinner_4","nextId":"dinner_5","clickRect":{"x":48,"y":115,"w":540,"h":230,"fromCenter":0.5},"tipId":"dinner_4","tipPos":{x:130,y:460},"touchAll":true,"needPush":true},//圈上面3兑换道具
		"dinner_5":{"otherId":"dinner_5","nextId":null,"needPush":true,"clickRect":{"x":230,"y":300,"w":180,"h":150},rectAlpha:0,guideBgAlpha:0,"handPos":{x:570,y:467},"clickToNext":true},//圈桌子区

		//人望
		"prestige_1":{"otherId":"prestige_1","nextId":"prestige_2","nameId":"servant_name1001","personPic":"servant_full_1001", "descId":4000,"clickContinue":true,"hideBlackBg":true},//箭头指向酒楼建筑
		"prestige_2":{"otherId":"prestige_2","nextId":null,"nameId":"storyNPCName1","personPic":1, "descId":4001,"clickContinue":true,"hideBlackBg":true},//圈进入宴会

		//主线任务
		// "maintask_1":{"otherId":"maintask_1","nextId":"servant_1", "clickRect":{"x":220,"y":600,"w":200,"h":80,"fromCenter":0.5}, "clickContinue":true,"handPos":{x:310,y:630,"fromCenter":0.5},onlyHand:true},//主线任务 id:4 "handPos":{x:320,y:610},
		// "maintask_2":{"otherId":"maintask_2","nextId":"challenge_1", "clickRect":{"x":220,"y":600,"w":200,"h":80,"fromCenter":0.5}, "clickContinue":true,"handPos":{x:310,y:630,"fromCenter":0.5}, onlyHand:true },//主线任务 id:4 "handPos":{x:320,y:610},
		"maintask_1":{"otherId":"maintask_1","nextId":"servant_1", "clickRect":{"x":220,"y":600,"w":200,"h":80,"fromCenter":0.5}, "clickContinue":true,onlyHand:true},//主线任务 id:4 "handPos":{x:320,y:610},
		"maintask_2":{"otherId":"maintask_2","nextId":"challenge_1", "clickRect":{"x":220,"y":600,"w":200,"h":80,"fromCenter":0.5}, "clickContinue":true,onlyHand:true },//主线任务 id:4 "handPos":{x:320,y:610},

		//门客
		"servant_1":{"otherId":"servant_1", "nextId":"servant_2", "clickRect":{"x":470,"y":560,"w":150,"h":60} ,"handPos":{x:490,y:580 }, onlyHand:true },//点门客升级按钮,参考109步
		"servant_2":{"otherId":"servant_2", "nextId":null, "clickRect":{"x":470,"y":600,"w":165,"h":70}, "handPos":{x:540,y:620 }, onlyHand:true },//点门客升级按钮,参考109步
		
		"servant10_1":{"otherId":"servant10_1","clickContinue":true,rectAlpha:0,"guideBgAlpha":0, "nextId":null,"tipId":"servant10_1","touchAll":true,"tipPos":{x:130,y:590},"clickRect":{"x":408,"y":407,"w":165,"h":70}, "handPos":{x:500,y:480 }},//点门客升级按钮,参考109步
		//关卡
		"challenge_1":{"otherId":"challenge_1","nextId":null, "clickRect":{"x":160,"y":600,"w":120,"h":120,"fromBottom":310}, "handPos":{x:200,y:650,"fromBottom":260}, onlyHand:true ,"isScenePos":"cityScene","sceneKey":"challenge"},//主线任务 id:4 "handPos":{x:320,y:610},

		//帮会任务 
		"alliancetask_1":{"otherId":"alliancetask_1","nextId":null,"descId":4101, "personPic":"story_npc_8","nameId":"storyNPCName44","clickContinue":true,"bgAlpha":0.7},

		//比武招亲活动
		"acMarry_1":{"otherId":"acMarry_1",nextId:"acMarry_2","nameId":"storyNPCName1","personPic":1,"descId":4201,"bgId":10,"clickContinue":true},
		"acMarry_2":{"otherId":"acMarry_2",nextId:"acMarry_3","nameId":"wifeName_220","personPic":"wife_full_220","descId":4202,"bgId":10,"clickContinue":true},
		"acMarry_3":{"otherId":"acMarry_3",nextId:"acMarry_4","nameId":"storyNPCName1","personPic":1,"descId":4203,"bgId":10,"clickContinue":true},
		"acMarry_4":{"otherId":"acMarry_4",nextId:null,"nameId":"acMarryViewNpcName1","personPic":"searchnpc_full32","descId":4204,"bgId":10,"clickContinue":true},

		//比武招亲活动2
		"acMarry_2_1":{"otherId":"acMarry_2_1",nextId:"acMarry_2_2","nameId":"wifeName_220","personPic":"wife_full_220","descId":4301,"bgId":10,"clickContinue":true},
		"acMarry_2_2":{"otherId":"acMarry_2_2",nextId:"acMarry_2_3","nameId":"storyNPCName1","personPic":1,"descId":4302,"bgId":10,"clickContinue":true},
		"acMarry_2_3":{"otherId":"acMarry_2_3",nextId:null,"nameId":"wifeName_220","personPic":"wife_full_220","descId":4303,"bgId":10,"clickContinue":true},

		//比武招亲活动
		"acMarry_1-2":{"otherId":"acMarry_1-2",nextId:"acMarry_2-2","nameId":"storyNPCName1","personPic":1,"descId":4401,"bgId":11,"clickContinue":true},
		"acMarry_2-2":{"otherId":"acMarry_2-2",nextId:"acMarry_3-2","nameId":"wifeName_220","personPic":"wife_full_220","descId":4402,"bgId":11,"clickContinue":true},
		"acMarry_3-2":{"otherId":"acMarry_3-2",nextId:"acMarry_4-2","nameId":"storyNPCName1","personPic":1,"descId":4403,"bgId":11,"clickContinue":true},
		"acMarry_4-2":{"otherId":"acMarry_4-2",nextId:null,"nameId":"acMarryViewNpcName1-2","personPic":"searchnpc_full32","descId":4404,"bgId":11,"clickContinue":true},

		//比武招亲活动2
		"acMarry_2_1-2":{"otherId":"acMarry_2_1-2",nextId:"acMarry_2_2-2","nameId":"wifeName_220","personPic":"wife_full_220","descId":4501,"bgId":11,"clickContinue":true},
		"acMarry_2_2-2":{"otherId":"acMarry_2_2-2",nextId:"acMarry_2_3-2","nameId":"storyNPCName1","personPic":1,"descId":4502,"bgId":11,"clickContinue":true},
		"acMarry_2_3-2":{"otherId":"acMarry_2_3-2",nextId:null,"nameId":"wifeName_220","personPic":"wife_full_220","descId":4503,"bgId":11,"clickContinue":true},

		//商店解锁签到礼包
		"shop_1":{"otherId":"shop_1","nextId":"shop_2", "descId":4601,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"bgAlpha":0.7},
		"shop_2":{"otherId":"shop_2","nextId":null, "descId":4602, "personPic":1,"nameId":"storyNPCName1","clickContinue":true,"bgAlpha":0.7},
		// "shop_3":{"otherId":"shop_3","nextId":null, "clickRect":{"x":20,"y":320,"w":600,"h":285,"fromBottom":330},"touchAll":true},

		//解锁签到皮肤碎片
		"skin_1":{"otherId":"skin_1","nextId":"skin_2", "descId":4701,"personPic":"wife_full_221","nameId":"wifeName_221","clickContinue":true,"bgAlpha":0.7},
		"skin_2":{"otherId":"skin_2","nextId":"skin_3", "descId":4702, "personPic":1,"nameId":"storyNPCName1","clickContinue":true,"bgAlpha":0.7},
		"skin_3":{"otherId":"skin_3","nextId":"skin_4", "descId":4703,"personPic":"wife_full_221","nameId":"wifeName_221","clickContinue":true,"bgAlpha":0.7},
		"skin_4":{"otherId":"skin_4","nextId":"skin_5", "descId":4704, "personPic":1,"nameId":"storyNPCName1","clickContinue":true,"bgAlpha":0.7},
		"skin_5":{"otherId":"skin_5","nextId":null, "descId":4705,"personPic":"wife_full_221","nameId":"wifeName_221","clickContinue":true,"bgAlpha":0.7},
		// "skin_6":{"otherId":"skin_6","nextId":null, "clickRect":{"x":10,"y":210,"w":310,"h":380,},"touchAll":true},

		//诸葛亮传
		"acLiangBiography_1-1":{"otherId":"acLiangBiography_1-1",nextId:"acLiangBiography_2-1","descId":4801,"bgId":12,"clickContinue":true},
		"acLiangBiography_2-1":{"otherId":"acLiangBiography_2-1",nextId:"acLiangBiography_3-1","nameId":"storyNPCName1","personPic":1,"descId":4802,"bgId":12,"clickContinue":true},
		"acLiangBiography_3-1":{"otherId":"acLiangBiography_3-1",nextId:"acLiangBiography_4-1","nameId":"servant_name2005","personPic":"servant_full_2005","descId":4803,"bgId":12,"clickContinue":true},
		"acLiangBiography_4-1":{"otherId":"acLiangBiography_4-1",nextId:"acLiangBiography_5-1","descId":4804,"bgId":12,"clickContinue":true},
		"acLiangBiography_5-1":{"otherId":"acLiangBiography_5-1",nextId:"acLiangBiography_6-1","nameId":"storyNPCName1","personPic":1,"descId":4805,"bgId":12,"clickContinue":true},
		"acLiangBiography_6-1":{"otherId":"acLiangBiography_6-1",nextId:null,"descId":4806,"bgId":12,"clickContinue":true},

		//庞统传
		"acLiangBiography_1-3":{"otherId":"acLiangBiography_1-3",nextId:"acLiangBiography_2-3","descId":5101,"bgId":12,"clickContinue":true},
		"acLiangBiography_2-3":{"otherId":"acLiangBiography_2-3",nextId:"acLiangBiography_3-3","nameId":"storyNPCName1","personPic":1,"descId":5102,"bgId":12,"clickContinue":true},
		"acLiangBiography_3-3":{"otherId":"acLiangBiography_3-3",nextId:"acLiangBiography_4-3","nameId":"servant_name2006","personPic":"servant_full_2006","descId":5103,"bgId":12,"clickContinue":true},
		"acLiangBiography_4-3":{"otherId":"acLiangBiography_4-3",nextId:"acLiangBiography_5-3","descId":5104,"bgId":12,"clickContinue":true},
		"acLiangBiography_5-3":{"otherId":"acLiangBiography_5-3",nextId:"acLiangBiography_6-3","nameId":"storyNPCName1","personPic":1,"descId":5105,"bgId":12,"clickContinue":true},
		"acLiangBiography_6-3":{"otherId":"acLiangBiography_6-3",nextId:null,"descId":5106,"bgId":12,"clickContinue":true},

		//郭嘉传
		"acLiangBiography_1-5":{"otherId":"acLiangBiography_1-5",nextId:"acLiangBiography_2-5","descId":5201,"bgId":12,"clickContinue":true},
		"acLiangBiography_2-5":{"otherId":"acLiangBiography_2-5",nextId:"acLiangBiography_3-5","nameId":"storyNPCName1","personPic":1,"descId":5202,"bgId":12,"clickContinue":true},
		"acLiangBiography_3-5":{"otherId":"acLiangBiography_3-5",nextId:"acLiangBiography_4-5","nameId":"servant_name2008","personPic":"servant_full_2008","descId":5203,"bgId":12,"clickContinue":true},
		"acLiangBiography_4-5":{"otherId":"acLiangBiography_4-5",nextId:"acLiangBiography_5-5","descId":5204,"bgId":12,"clickContinue":true},
		"acLiangBiography_5-5":{"otherId":"acLiangBiography_5-5",nextId:"acLiangBiography_6-5","nameId":"storyNPCName1","personPic":1,"descId":5205,"bgId":12,"clickContinue":true},
		"acLiangBiography_6-5":{"otherId":"acLiangBiography_6-5",nextId:null,"descId":5206,"bgId":12,"clickContinue":true},

		//司马懿传
		"acLiangBiography_1-7":{"otherId":"acLiangBiography_1-7",nextId:"acLiangBiography_2-7","descId":5501,"bgId":12,"clickContinue":true},
		"acLiangBiography_2-7":{"otherId":"acLiangBiography_2-7",nextId:"acLiangBiography_3-7","nameId":"storyNPCName1","personPic":1,"descId":5502,"bgId":12,"clickContinue":true},
		"acLiangBiography_3-7":{"otherId":"acLiangBiography_3-7",nextId:"acLiangBiography_4-7","nameId":"servant_name2007","personPic":"servant_full_2007","descId":5503,"bgId":12,"clickContinue":true},
		"acLiangBiography_4-7":{"otherId":"acLiangBiography_4-7",nextId:"acLiangBiography_5-7","descId":5504,"bgId":12,"clickContinue":true},
		"acLiangBiography_5-7":{"otherId":"acLiangBiography_5-7",nextId:"acLiangBiography_6-7","nameId":"storyNPCName1","personPic":1,"descId":5505,"bgId":12,"clickContinue":true},
		"acLiangBiography_6-7":{"otherId":"acLiangBiography_6-7",nextId:null,"descId":5506,"bgId":12,"clickContinue":true},
		
		//云顶飞龙活动
		"acYunDingLongKu_1-1":{"otherId":"acYunDingLongKu_1-1",nextId:"acYunDingLongKu_2-1","nameId":"storyNPCName1","personPic":1,"descId":4901,"bgId":13,"clickContinue":true},
		"acYunDingLongKu_2-1":{"otherId":"acYunDingLongKu_2-1",nextId:"acYunDingLongKu_3-1","nameId":"acYunDingLongKuViewNpcName-1","personPic":"acyundinglongkuview_enemynpc","descId":4902,"bgId":13,"clickContinue":true},
		"acYunDingLongKu_3-1":{"otherId":"acYunDingLongKu_3-1",nextId:"acYunDingLongKu_4-1","nameId":"storyNPCName1","personPic":1,"descId":4903,"bgId":13,"clickContinue":true},
		"acYunDingLongKu_4-1":{"otherId":"acYunDingLongKu_4-1",nextId:null,"nameId":"wifeName_222","personPic":"wife_full_222","descId":4904,"bgId":13,"clickContinue":true},

		//滨海艺人
		"acSeawoman_1-1":{"otherId":"acSeawoman_1-1",nextId:"acSeawoman_2-1","descId":5601,"nameId":"storyNPCName1","personPic":1,"bgId":6,"clickContinue":true,"showskip":true},
		"acSeawoman_2-1":{"otherId":"acSeawoman_2-1",nextId:"acSeawoman_3-1","nameId":"servant_name1001","personPic":"servant_full_1001","descId":5602,"bgId":6,"clickContinue":true,"showskip":true},
		"acSeawoman_3-1":{"otherId":"acSeawoman_3-1",nextId:"acSeawoman_4-1","nameId":"storyNPCName1","personPic":1,"descId":5603,"bgId":6,"clickContinue":true,"showskip":true},
		"acSeawoman_4-1":{"otherId":"acSeawoman_4-1",nextId:"acSeawoman_5-1","nameId":"wifeName_217","personBone":"wife_full3_2172","personPic":"wife_skin_2172","descId":5604,"bgId":6,"clickContinue":true,"showskip":true},
		"acSeawoman_5-1":{"otherId":"acSeawoman_5-1",nextId:"acSeawoman_6-1","nameId":"storyNPCName1","personPic":1,"descId":5605,"bgId":6,"clickContinue":true,"showskip":true},
		"acSeawoman_6-1":{"otherId":"acSeawoman_6-1",nextId:"acSeawoman_7-1","nameId":"wifeName_217","personBone":"wife_full3_2172","personPic":"wife_skin_2172","descId":5606,"bgId":15,"clickContinue":true,"showskip":true},
		"acSeawoman_7-1":{"otherId":"acSeawoman_7-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5607,"bgId":15,"clickContinue":true,"showskip":true},

		//情定鹊桥
		"acBirdBridge_1-1":{"otherId":"acBirdBridge_1-1",nextId:"acBirdBridge_2-1","descId":5701,"nameId":"storyNPCName1","personPic":1,"bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_2-1":{"otherId":"acBirdBridge_2-1",nextId:"acBirdBridge_3-1","descId":5702,"personPic":"wife_full_101","nameId":"wifeName_101","bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_3-1":{"otherId":"acBirdBridge_3-1",nextId:"acBirdBridge_4-1","descId":5703,"nameId":"storyNPCName1","personPic":1,"bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_4-1":{"otherId":"acBirdBridge_4-1",nextId:"acBirdBridge_5-1","descId":5704,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_5-1":{"otherId":"acBirdBridge_5-1",nextId:"acBirdBridge_6-1","nameId":"servant_name1067","personBone":"servant_full2_1067","personPic":"servant_full_1067","descId":5705,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_6-1":{"otherId":"acBirdBridge_6-1",nextId:"acBirdBridge_7-1","nameId":"wifeName_254","personBone":"wife_full_254","personPic":"wife_full_254","descId":5706,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_7-1":{"otherId":"acBirdBridge_7-1",nextId:"acBirdBridge_8-1","nameId":"servant_name1067","personBone":"servant_full2_1067","personPic":"servant_full_1067","descId":5707,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_8-1":{"otherId":"acBirdBridge_8-1",nextId:"acBirdBridge_9-1","nameId":"wifeName_254","personBone":"wife_full_254","personPic":"wife_full_254","descId":5708,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_9-1":{"otherId":"acBirdBridge_9-1",nextId:null,"descId":5709,"nameId":"storyNPCName1","personPic":1,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		

		//情定鹊桥
		"acBirdBridge_1-3":{"otherId":"acBirdBridge_1-3",nextId:"acBirdBridge_2-3","descId":5801,"nameId":"storyNPCName1","personPic":1,"bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_2-3":{"otherId":"acBirdBridge_2-3",nextId:"acBirdBridge_3-3","descId":5802,"personPic":"wife_full_101","nameId":"wifeName_101","bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_3-3":{"otherId":"acBirdBridge_3-3",nextId:"acBirdBridge_4-3","descId":5803,"nameId":"storyNPCName1","personPic":1,"bgId":6,"clickContinue":true,"showskip":true},
		"acBirdBridge_4-3":{"otherId":"acBirdBridge_4-3",nextId:"acBirdBridge_5-3","descId":5804,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_5-3":{"otherId":"acBirdBridge_5-3",nextId:"acBirdBridge_6-3","nameId":"storyNPCName1","personPic":1,"descId":5805,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_6-3":{"otherId":"acBirdBridge_6-3",nextId:"acBirdBridge_7-3","nameId":"wifeName_101","personBone":"wife_full_101","personPic":"wife_full_101","descId":5806,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_7-3":{"otherId":"acBirdBridge_7-3",nextId:"acBirdBridge_8-3","nameId":"storyNPCName1","personPic":"1","descId":5807,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_8-3":{"otherId":"acBirdBridge_8-3",nextId:"acBirdBridge_9-3","nameId":"wifeName_101","personBone":"wife_full_101","personPic":"wife_full_101","descId":5808,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},
		"acBirdBridge_9-3":{"otherId":"acBirdBridge_9-3",nextId:null,"descId":5809,"nameId":"storyNPCName1","personPic":1,"bgName":"birdbridge_bg-1","clickContinue":true,"showskip":true},

		//鼠来招财
		"acMouseTreasure_1-1":{"otherId":"acMouseTreasure_1-1",nextId:"acMouseTreasure_2-1","descId":5901,"nameId":"wifeName_310","personBone":"wife_full3_3105","personPic":"wife_skin_3105","bgId":6,"clickContinue":true,"showskip":true},
		"acMouseTreasure_2-1":{"otherId":"acMouseTreasure_2-1",nextId:"acMouseTreasure_3-1","nameId":"servant_name1001","personPic":"servant_full_1001","descId":5902,"bgId":6,"clickContinue":true,"showskip":true},
		"acMouseTreasure_3-1":{"otherId":"acMouseTreasure_3-1",nextId:"acMouseTreasure_4-1","nameId":"storyNPCName1","personPic":1,"descId":5903,"bgId":6,"clickContinue":true,"showskip":true},
		"acMouseTreasure_4-1":{"otherId":"acMouseTreasure_4-1",nextId:null,"nameId":"wifeName_310","personBone":"wife_full3_3105","personPic":"wife_skin_3105","descId":5904,"bgId":6,"clickContinue":true,"showskip":true},
	



		//搜查魏府
		"acSearchProof_1_1-1":{"otherId":"acSearchProof_1_1-1",nextId:"acSearchProof_2_1-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5001,"bgId":14,"clickContinue":true},
		"acSearchProof_2_1-1":{"otherId":"acSearchProof_2_1-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5002,"bgId":14,"clickContinue":true},
		//搜查魏府2
		"acSearchProof_1_2-1":{"otherId":"acSearchProof_1_2-1",nextId:"acSearchProof_2_2-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5011,"bgId":14,"clickContinue":true},
		"acSearchProof_2_2-1":{"otherId":"acSearchProof_2_2-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5012,"bgId":14,"clickContinue":true},
		//搜查魏府3
		"acSearchProof_1_3-1":{"otherId":"acSearchProof_1_3-1",nextId:"acSearchProof_2_3-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5021,"bgId":14,"clickContinue":true},
		"acSearchProof_2_3-1":{"otherId":"acSearchProof_2_3-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5022,"bgId":14,"clickContinue":true},
		//搜查魏府4
		"acSearchProof_1_4-1":{"otherId":"acSearchProof_1_4-1",nextId:"acSearchProof_2_4-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5031,"bgId":14,"clickContinue":true},
		"acSearchProof_2_4-1":{"otherId":"acSearchProof_2_4-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5032,"bgId":14,"clickContinue":true},

		//搜查魏府5
		"acSearchProof_1_5-1":{"otherId":"acSearchProof_1_5-1",nextId:"acSearchProof_2_5-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5041,"bgId":14,"clickContinue":true},
		"acSearchProof_2_5-1":{"otherId":"acSearchProof_2_5-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5042,"bgId":14,"clickContinue":true},

		//搜查魏府6
		"acSearchProof_1_6-1":{"otherId":"acSearchProof_1_6-1",nextId:"acSearchProof_2_6-1","nameId":"servant_name2004","personPic":"skin_full_20041","descId":5051,"bgId":14,"clickContinue":true},
		"acSearchProof_2_6-1":{"otherId":"acSearchProof_2_6-1",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5052,"bgId":14,"clickContinue":true},

		//搜查高府
		"acSearchProof_1_1-3":{"otherId":"acSearchProof_1_1-3",nextId:"acSearchProof_2_1-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5001,"bgId":14,"clickContinue":true},
		"acSearchProof_2_1-3":{"otherId":"acSearchProof_2_1-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5002,"bgId":14,"clickContinue":true},
		//搜查高府2
		"acSearchProof_1_2-3":{"otherId":"acSearchProof_1_2-3",nextId:"acSearchProof_2_2-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5011,"bgId":14,"clickContinue":true},
		"acSearchProof_2_2-3":{"otherId":"acSearchProof_2_2-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5012,"bgId":14,"clickContinue":true},
		//搜查高府3
		"acSearchProof_1_3-3":{"otherId":"acSearchProof_1_3-3",nextId:"acSearchProof_2_3-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5021,"bgId":14,"clickContinue":true},
		"acSearchProof_2_3-3":{"otherId":"acSearchProof_2_3-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5022,"bgId":14,"clickContinue":true},
		//搜查高府4
		"acSearchProof_1_4-3":{"otherId":"acSearchProof_1_4-3",nextId:"acSearchProof_2_4-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5031,"bgId":14,"clickContinue":true},
		"acSearchProof_2_4-3":{"otherId":"acSearchProof_2_4-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5032,"bgId":14,"clickContinue":true},
		//搜查高府5
		"acSearchProof_1_5-3":{"otherId":"acSearchProof_1_5-3",nextId:"acSearchProof_2_5-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5041,"bgId":14,"clickContinue":true},
		"acSearchProof_2_5-3":{"otherId":"acSearchProof_2_5-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5042,"bgId":14,"clickContinue":true},
		//搜查高府6
		"acSearchProof_1_6-3":{"otherId":"acSearchProof_1_6-3",nextId:"acSearchProof_2_6-3","nameId":"servant_name2003","personPic":"skin_full_20031","descId":5051,"bgId":14,"clickContinue":true},
		"acSearchProof_2_6-3":{"otherId":"acSearchProof_2_6-3",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5052,"bgId":14,"clickContinue":true},

		//搜查赵府
		"acSearchProof_1_1-5":{"otherId":"acSearchProof_1_1-5",nextId:"acSearchProof_2_1-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5001,"bgId":14,"clickContinue":true},
		"acSearchProof_2_1-5":{"otherId":"acSearchProof_2_1-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5002,"bgId":14,"clickContinue":true},
		//搜查赵府2
		"acSearchProof_1_2-5":{"otherId":"acSearchProof_1_2-5",nextId:"acSearchProof_2_2-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5011,"bgId":14,"clickContinue":true},
		"acSearchProof_2_2-5":{"otherId":"acSearchProof_2_2-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5012,"bgId":14,"clickContinue":true},
		//搜查赵府3
		"acSearchProof_1_3-5":{"otherId":"acSearchProof_1_3-5",nextId:"acSearchProof_2_3-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5021,"bgId":14,"clickContinue":true},
		"acSearchProof_2_3-5":{"otherId":"acSearchProof_2_3-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5022,"bgId":14,"clickContinue":true},
		//搜查赵府4
		"acSearchProof_1_4-5":{"otherId":"acSearchProof_1_4-5",nextId:"acSearchProof_2_4-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5031,"bgId":14,"clickContinue":true},
		"acSearchProof_2_4-5":{"otherId":"acSearchProof_2_4-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5032,"bgId":14,"clickContinue":true},
		//搜查赵府5
		"acSearchProof_1_5-5":{"otherId":"acSearchProof_1_5-5",nextId:"acSearchProof_2_5-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5041,"bgId":14,"clickContinue":true},
		"acSearchProof_2_5-5":{"otherId":"acSearchProof_2_5-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5042,"bgId":14,"clickContinue":true},
		//搜查赵府6
		"acSearchProof_1_6-5":{"otherId":"acSearchProof_1_6-5",nextId:"acSearchProof_2_6-5","nameId":"servant_name2002","personPic":"skin_full_20021","descId":5051,"bgId":14,"clickContinue":true},
		"acSearchProof_2_6-5":{"otherId":"acSearchProof_2_6-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5052,"bgId":14,"clickContinue":true},

		//搜查秦府
		"acSearchProof_1_1-7":{"otherId":"acSearchProof_1_1-7",nextId:"acSearchProof_2_1-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5001,"bgId":14,"clickContinue":true},
		"acSearchProof_2_1-7":{"otherId":"acSearchProof_2_1-7",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5002,"bgId":14,"clickContinue":true},
		//搜查秦府2
		"acSearchProof_1_2-7":{"otherId":"acSearchProof_1_2-7",nextId:"acSearchProof_2_2-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5011,"bgId":14,"clickContinue":true},
		"acSearchProof_2_2-7":{"otherId":"acSearchProof_2_2-7",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5012,"bgId":14,"clickContinue":true},
		//搜查秦府3
		"acSearchProof_1_3-7":{"otherId":"acSearchProof_1_3-7",nextId:"acSearchProof_2_3-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5021,"bgId":14,"clickContinue":true},
		"acSearchProof_2_3-7":{"otherId":"acSearchProof_2_3-5",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5022,"bgId":14,"clickContinue":true},
		//搜查秦府4
		"acSearchProof_1_4-7":{"otherId":"acSearchProof_1_4-7",nextId:"acSearchProof_2_4-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5031,"bgId":14,"clickContinue":true},
		"acSearchProof_2_4-7":{"otherId":"acSearchProof_2_4-7",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5032,"bgId":14,"clickContinue":true},
		//搜查秦府5
		"acSearchProof_1_5-7":{"otherId":"acSearchProof_1_5-7",nextId:"acSearchProof_2_5-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5041,"bgId":14,"clickContinue":true},
		"acSearchProof_2_5-7":{"otherId":"acSearchProof_2_5-7",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5042,"bgId":14,"clickContinue":true},
		//搜查秦府6
		"acSearchProof_1_6-7":{"otherId":"acSearchProof_1_6-7",nextId:"acSearchProof_2_6-7","nameId":"servant_name2001","personPic":"skin_full_20011","descId":5051,"bgId":14,"clickContinue":true},
		"acSearchProof_2_6-7":{"otherId":"acSearchProof_2_6-7",nextId:null,"nameId":"storyNPCName1","personPic":1,"descId":5052,"bgId":14,"clickContinue":true},
		//神兵宝库
		"acWeaponHouse_1":{"otherId":"acWeaponHouse_1","clickContinue":true,rectAlpha:0,"guideBgAlpha":0.5, "nextId":"acWeaponHouse_2","tipId":"acWeaponHouse_1","touchAll":true,"tipPos":{x:60,y:150},"clickRect":{"x":67,"y":222,"w":506,"h":555},},//点门客升级按钮,参考109步
		"acWeaponHouse_2":{"otherId":"acWeaponHouse_2","clickContinue":true,rectAlpha:0,"guideBgAlpha":0.5, "nextId":null,"tipId":"acWeaponHouse_2","touchAll":true,"needPush2":true,"tipPos":{x:60,y:150},"clickRect":{"x":67,"y":222,"w":506,"h":555},},//点门客升级按钮,参考109步

		//珍器坊引导对话
		"zhenqifang_0":{
			"otherId":"zhenqifang_0",
			"nextId":null, 
			"clickRect":{"x":10,"y":850,"w":144,"h":100,"fromBottom":107},
			"handPos":{x:72,y:880,"fromBottom":73}
		},
		"zhenqifang_1":{
			"otherId":"zhenqifang_1",
			"nextId":"zhenqifang_2", 
			"nameId":"servant_name1001",
			"personPic":`servant_full_1001`,
			"descId":5301,
			"bgId":6,
			"clickContinue":true
		},
		//对话
		"zhenqifang_2":{
			"otherId":"zhenqifang_2",
			"nextId":"zhenqifang_3", 
			"nameId":"storyNPCName1",
			"personPic":1,
			"descId":5302,
			"bgId":6,
			"clickContinue":true
		},
		//箭头指向珍器坊按钮
		"zhenqifang_3":{
			"otherId":"zhenqifang_3",
			"nextId":"zhenqifang_4", 
			"clickRect":{
				"x":0,
				"y":10,
				"w":71,
				"h":80
			},
			"handPos":{x:0,y:0},
		},
		//对话
		"zhenqifang_4":{
			"otherId":"zhenqifang_4",
			"nextId":`zhenqifang_5`, 
			"descId":5303,
			"bgId":10,
			"clickContinue":true
		},
		//对话
		"zhenqifang_5":{
			"otherId":"zhenqifang_5",
			"nextId":`zhenqifang_6`, 
			"nameId":"storyNPCName1",
			"personPic":1,
			"descId":5304,
			"bgId":10,
			"clickContinue":true
		},
		//对话
		"zhenqifang_6":{
			"otherId":"zhenqifang_6",
			"nextId":`zhenqifang_7`, 
			"nameId":"acMarryViewNpcName2",
			"personPic":`story_npc_5`,
			"descId":5305,
			"bgId":10,
			"clickContinue":true
		},
		//箭头指向派出门客
		"zhenqifang_7":{
			"otherId":"zhenqifang_7",
			"nextId":"zhenqifang_8", 
			"clickRect":{
				"x":0,
				"y":0,
				"w":95,
				"h":95
			},
			"handPos":{x:0,y:0},
		},
		//箭头指向第一个门客
		"zhenqifang_8":{
			"otherId":"zhenqifang_8",
			"nextId":"zhenqifang_9", 
			"clickRect":{
				"x":0,
				"y":0,
				"w":166,
				"h":62
			},
			"handPos":{x:0,y:0},
		},
		//箭头指向派出按钮
		"zhenqifang_9":{
			"otherId":"zhenqifang_9",
			"nextId":"zhenqifang_10", 
			"clickRect":{
				"x":0,
				"y":0,
				"w":140,
				"h":62
			},
			"handPos":{x:0,y:0},
		},
		//对话
		"zhenqifang_10":{
			"otherId":"zhenqifang_10",
			"nextId":"zhenqifang_11", 
			"nameId":"acMarryViewNpcName2",
			"personPic":`story_npc_5`,
			"descId":5306,
			"bgId":10,
			"clickContinue":true
		},
		"zhenqifang_11":{
			"otherId":"zhenqifang_11",
			"nextId":"zhenqifang_12", 
			"clickRect":{
				"x":0,
				"y":0,
				"w":140,
				"h":62
			},
			"handPos":{x:0,y:0},
		},
		//领奖励后对话
		"zhenqifang_12":{
			"otherId":"zhenqifang_12",
			"nextId":"zhenqifang_13", 
			"nameId":"acMarryViewNpcName2",
			"personPic":`story_npc_5`,
			"descId":5307,
			"bgId":10,
			"clickContinue":true
		},
		//对话
		"zhenqifang_13":{
			"otherId":"zhenqifang_13",
			"nextId":"zhenqifang_14", 
			"nameId":"acMarryViewNpcName2",
			"personPic":`story_npc_5`,
			"descId":5308,
			"bgId":10,
			"clickContinue":true
		},
		//点击道具
		"zhenqifang_14":{
			"otherId":"zhenqifang_14",
			"nextId":"zhenqifang_15", 
			"clickRect":{"x":260,"y":850,"w":100,"h":100,"fromBottom":107},
			"handPos":{x:292,y:880,"fromBottom":73}
		},
		//第一个道具使用
		"zhenqifang_15":{
			"otherId":"zhenqifang_15",
			"nextId":"zhenqifang_16", 
			"clickRect":{"x":301,"y":794,"w":188,"h":68,"fromBottom":99},
			"handPos":{x:320,y:759,"fromBottom":53},
		},
		//对话
		"zhenqifang_16":{
			"otherId":"zhenqifang_16",
			"nextId":"zhenqifang_17", 
			"nameId":"storyNPCName1",
			"personPic":1,
			"descId":5309,
			"bgId":6,
			"clickContinue":true
		},
		//对话
		"zhenqifang_17":{
			"otherId":"zhenqifang_17",
			"nextId":"zhenqifang_18", 
			"nameId":"servant_name1001",
			"personPic":`servant_full_1001`,
			"descId":5310,
			"bgId":6,
			"clickContinue":true
		},
		//对话
		"zhenqifang_18":{
			"otherId":"zhenqifang_18",
			"nextId":null,
			"nameId":"acMarryViewNpcName2",
			"personPic":`story_npc_5`,
			"descId":5311,
			"bgId":6,
			"clickContinue":true,
		},		
		//对话
		"weapon_1":{
			"otherId":"weapon_1",
			"nextId":"weapon_2", 
			"descId":5401, 
			"personPic":1,
			"nameId":"storyNPCName1",
			"clickContinue":true,
			"bgId":6,},
		"weapon_2":{
			"otherId":"weapon_2",
			"nextId":"weapon_3", 
			"descId":5402, 
			"personPic":"servant_full_1001",
			"nameId":"servant_name1001",
			"clickContinue":true,
			"bgId":6,},
		"weapon_3":{
			"otherId":"weapon_3",
			"nextId":"weapon_4", 
			"descId":5403, 
			"personPic":"empshopman",
			"nameId":"promoteType7",
			"clickContinue":true,
			"bgId":6,},
		//关闭背包
		"weapon_4":{
			"otherId":"weapon_4",
			"nextId":"weapon_5", 
			"clickRect":{"x":565,"y":5,"w":75,"h":75},
			"handPos":{x:617,y:45,
			"flip":true},
		},
		//点门客按钮
		"weapon_5":{
			"otherId":"weapon_5",
			"nextId":"weapon_6", 
			"clickRect":{"x":165,"y":850,"w":100,"h":100,"fromBottom":107},
			"handPos":{x:198,y:880,"fromBottom":53}
		},
		//点门元芳
		"weapon_6":{
			"otherId":"weapon_6",
			"nextId":"weapon_7", 
			"clickRect":{"x":11,"y":111,"w":200,"h":258},
			"handPos":{x:97,y:280}
		},
		"weapon_6_2":{
			"otherId":"weapon_6",
			"nextId":"weapon_7", 
			"clickRect":{"x":11,"y":160,"w":200,"h":258},
			"handPos":{x:97,y:280},
		},
		//点门神器
		"weapon_7":{
			"otherId":"weapon_7",
			"nextId":"weapon_8", 
			"clickRect":{"x":480,"y":580,"w":100,"h":100},
			"handPos":{x:570,y:620,"flip":true},
		},
		//点门升级
		"weapon_8":{
			"otherId":"weapon_8",
			"nextId":null, 
			"needPush2":true,
			"clickRect":{"x":440,"y":846,"w":150,"h":60},
			"handPos":{x:505,y:860},
			// "waitNext":"weapon_9",
		},
		//对话
		"weapon_9":{
			"otherId":"weapon_9",
			"nextId":"weapon_10", 
			"descId":5404, 
			"personPic":"empshopman",
			"nameId":"promoteType7",
			"clickContinue":true,
			"bgId":6,},
		"weapon_10":{
			"otherId":"weapon_10",
			"nextId":null, 
			"descId":5405, 
			"personPic":"empshopman",
			"nameId":"promoteType7",
			"clickContinue":true,
			"bgId":6,},

		//红颜对战
		"wifebattle_1":{"otherId":"wifebattle_1","nextId":"wifebattle_2", "clickRect":{"x":0,"y":0,"w":0,"h":0},"tipId":"wifebattle_1","tipPos":{x:130,y:400},"touchAll":true},
		"wifebattle_2":{"otherId":"wifebattle_2","nextId":"wifebattle_3", "clickRect":{"x":0,"y":0,"w":0,"h":0},"tipId":"wifebattle_2","tipPos":{x:130,y:400},"touchAll":true},
		"wifebattle_3":{"otherId":"wifebattle_3","nextId":"wifebattle_4", "clickRect":{"x":100,"y":560,"w":440,"h":525,fromBottom:850},"tipId":"wifebattle_3","tipPos":{x:130,y:700},"touchAll":true},
		"wifebattle_4":{"otherId":"wifebattle_4","nextId":"wifebattle_5", "clickRect":{"x":18,"y":560,"w":80,"h":80,fromBottom:190},"tipId":"wifebattle_4","tipPos":{x:130,y:650},"touchAll":true},
		"wifebattle_5":{"otherId":"wifebattle_5","nextId":null, "clickRect":{"x":542,"y":125,"w":86,"h":168,"fromBottom":270},"tipId":"wifebattle_5","tipPos":{x:130,y:650},"touchAll":true},

		//  姻缘祠拜访引导
		"baifang_1":{"otherId":"baifang_1","nextId":null,"clickToNext":true,"clickRect":{"x":520,"y":422,"w":100,"h":100},"handPos":{x:570,y:467,"flip":true}
				,rectAlpha:0,guideBgAlpha:0},

	};

	export function changeRookieCfg():void
	{

		if (Api.switchVoApi.checkRookieDelTask() == true)
		{
			rookieCfg["125"].nextId = null;
			rookieCfg["125"].guideId = rookieCfg.guideSteps;
		}
		if(Api.switchVoApi.checkOpenExile())
		{
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile")){
					rookieCfg["107"].nextId = "108_exile";
				}
				else{
					rookieCfg["107"].nextId = "108";	
				}
			}
			else{
				rookieCfg["107"].nextId = "108_exile";
				
			}
			// rookieCfg["107"].nextId = "108_exile";
		}
		else{
			rookieCfg["107"].nextId = "108";
		}
		if(Api.switchVoApi.checkOpenWifeBattle()){
			rookieCfg["14_2"].clickRect.w = 100;
			rookieCfg["14_3"].clickRect.w = 100;
			rookieCfg["14_3"].clickRect.x = 272;
		}
	}

	export function getRookieCfg(key:string):any
	{
		if (isNeedCheck)
		{	
			if (Api.switchVoApi.checkRookieDelTask() == true)
			{
				rookieCfg["125"].nextId = null;
				rookieCfg["125"].guideId = rookieCfg.guideSteps;
				rookieCfg["guideEndId"]="125";
			}
			if(Api.switchVoApi.checkOpenExile())
			{
				if (Api.unlocklist2VoApi.checkShowOpenFunc()){
					if (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile")){
						rookieCfg["107"].nextId = "108_exile";
						rookieCfg["weapon_5"].nextId = "weapon_6_2";
						rookieCfg["servant2_1"].nextId = "servant2_2_2";
					}
					else{
						rookieCfg["107"].nextId = "108";
						rookieCfg["weapon_5"].nextId = "weapon_6";
						rookieCfg["servant2_1"].nextId = "servant2_2";
					}
				}
				else{
					rookieCfg["107"].nextId = "108_exile";
					rookieCfg["weapon_5"].nextId = "weapon_6_2";
					rookieCfg["servant2_1"].nextId = "servant2_2_2";
				}
				// rookieCfg["107"].nextId = "108_exile";
				// rookieCfg["weapon_5"].nextId = "weapon_6_2";
				// rookieCfg["servant2_1"].nextId = "servant2_2_2";
			}
			else{
				rookieCfg["107"].nextId = "108";
				rookieCfg["weapon_5"].nextId = "weapon_6";
				rookieCfg["servant2_1"].nextId = "servant2_2";
			}
			if (Api.rookieVoApi.isEnLang())
			{	
				rookieCfg["109"].waitNext = null;
				rookieCfg["109"].nextId = "110";
			}

			if(PlatformManager.checkIsTextHorizontal())
			{	
				rookieCfg["search_2"].clickRect.fromBottom = 115;
				rookieCfg["search_3"].tipPos.y = 200;
			}
			if (!PlatformManager.checkIsKRSp())
			{
				rookieCfg["128"].clickRect.w = 310;
				rookieCfg["child_4"].tipPos.y = 450;
			}
			isNeedCheck = false;
		}
		let onekey:string = key ;
		if (rookieCfg[key + "_scroll"] && Api.otherInfoVoApi.isSceneCanScroll("cityScene")) {
			onekey = key + "_scroll";
		}
		return rookieCfg[onekey];
	}

	export function setNeedCheck(isNeed:boolean){
		isNeedCheck = isNeed;
	}
}