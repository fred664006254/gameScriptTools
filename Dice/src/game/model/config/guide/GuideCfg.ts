
/**
 * 新手引导配置
 */
namespace GuideCfg 
{
	/**
	 * 新手引导配置
	 * period 阶段id
	 * step 当前阶段下的步骤id
	 * nextId 下一步ID
	 * layer 层级 
	 * viewname 界面名称
	 * key 界面元素
	 * keyparam 界面元素触发点击时候传入的参数
	 * descStr 文字描述
	 * descpos 文字距离界面元素中心的位置
	 * showRect 是否有显示区域
	 * showArrow 是否显示箭头
	 * arrowpos 箭头距离界面元素中心的位置
	 * showHand 是否显示小手
	 * handpos 小手距离界面元素中心的位置
	 * showNext 点击后直接进行下一步
	 * ExtRect 不是严丝合缝的
	 * handmove 小手移动动画
	 * hide 关闭引导弹窗
	 */
	export let rookieCfg:any = {
		//总步骤
		guideSteps : 9999,
		//首次战斗 引导组 1  战斗流程，编号1-6
		//1 界面点击对战模式
		1 : {guidid : 1, period : 1,step : 1, nextId : 2, layer : `scene`, viewname : "ReadyScene", key : "pvpBtn", keyparam : 1, descStr : "guideWarDesc1", showRect : true, showMask : true, showArrow : true, arrowpos : {x : 0, y : -67-12-50}, descpos : {x : 0, y : -67-60-12-100-36}},
		//2 对战模式弹窗点击快速匹配
		2 : {guidid : 2, period : 1,step : 2, nextId : 3, layer : `popup`, viewname : "WarChoosePopupView",  key : "findBtn", showRect : true, showHand : true, handpos : {x : 0, y : 0}, showMask : true,},
		//3 进入战斗界面 召唤一个龙珠
		3 : {guidid : 3, period : 1,step : 3, nextId : 5, layer : `view`, viewname : "Battle1View",  key : "_buyBtn", keyrect : {width : 198, height : 100}, showRect : true , descStr : "guideWarDesc2", descpos : {x : 0, y : -51-15-70}, ExtRect : {x : 0, y : 20, width : 0, height : 10}, showMask : true},
		//4 战斗界面 sp条说明
		//4 : {guidid : 4, period : 1,step : 4, layer : `view`, viewname : "Battle1View",  key : "spBg", showRect : true , descStr : "guideWarDesc3", descpos : {x : 0, y : -20-15-70}, addtouch : true, showNext : true, needTouch : true,  showMask : true,},
		//5 战斗界面 在召唤一个龙珠
		5 : {guidid : 5, period : 1,step : 5, nextId : 7, layer : `view`, viewname : "Battle1View",  key : "_buyBtn", keyrect : {width : 198, height : 100}, showRect : true , descStr : "guideWarDesc4", descpos : {x : 0, y : -51-15-70}, ExtRect : {x : 0, y : 20, width : 0, height : 10},  showMask : true,},
		//6 战斗界面 sp条说明
		// 6 : {guidid : 6, period : 1,step : 6, nextId : 7, layer : `view`, viewname : "Battle1View",  key : "spBg", showRect : true , descStr : "guideWarDesc5", descpos : {x : 0, y : -20-15-30}, addtouch : true, showNext : true, needTouch : true,  showMask : true,},
		//7 战斗界面 最后再召唤一个龙珠
		7 : {guidid : 7, period : 1,step : 7, nextId : 9, layer : `view`, viewname : "Battle1View",  key : "_buyBtn", keyrect : {width : 198, height : 100}, showRect : true , descStr : "guideWarDesc6", descpos : {x : 0, y : -51-15-70}, ExtRect : {x : 0, y : 20, width : 0, height : 10},  showMask : true,},
		//8 战斗界面 凸显中心两个龙珠
		// 8 :  {guidid : 8, period : 1,step : 8, nextId : 9, layer : `view`, viewname : "Battle1View",  key : "guideRect", showRect : true , descStr : "guideWarDesc7", descpos : {x : 0, y : -41-65-60}, addtouch : true, showNext : true,  needTouch : true, showMask : true, descWidth : 300},
		//9 战斗界面 合成两个龙珠演示
		9 :  {guidid : 9, period : 1,step : 9, nextId : 10, layer : `view`, viewname : "Battle1View",  key : "guideRect", showRect : true , descStr : "guideWarDesc8", descpos : {x : 0, y : -41-65-180}, handmove : true, showHand : true, descWidth : 300},
		//10 小鸟属性框
		10 :  {guidid : 10, period : 1,step : 10, nextId : 11, layer : `view`, viewname : "Battle1View",  key : "guideRect", showRect : true , descStr : "guideWarDesc17", descpos : {x : 0, y : -58-55-35}, showMask : true, descWidth : 350},
		//11星级攻速介绍
		11 :  {guidid : 11, period : 1,step : 11, layer : `popup`, viewname : "DiceDetailInfoView",  key : "_starDescGroup", showRect : true , descStr : "guideWarDesc18", descpos : {x : -100, y : -33}, needTouch : true, showMask : true},
		//12 战斗界面 powerup演示
		12 :  {guidid : 12, period : 1,step : 12, layer : `view`, viewname : "Battle1View",  key : "_upinfoBg", showRect : true , descStr : "guideWarDesc9", descpos : {x : 0, y : -58-55-20}, handmove : true, showHand : true, needTouch : true, showMask : true},
		//13 对方第1个怪物进入终点时，暂停游戏突出红心位置
		13 :  {guidid : 13, period : 1,step : 13, layer : `view`, viewname : "Battle1View",  key : "_enermyHpGroup", showRect : true , descStr : "guideWarDesc19", descpos : {x : 0, y : -58-55-40}, needTouch : true, showMask : true, descWidth : 350},
		//14 战斗结算 点击奖励
		14 :  {guidid : 14, period : 1,step : 14, layer : `popup`, showRect : true, viewname : "BattleResultView",  key : "_rewaedBtn",  onlyshowHand : true, handpos : {x : -30, y : 200}},
		//15 战斗界面 点击确定
		15 :  {guidid : 15, period : 1,step : 15, layer : `popup`, showRect : true, viewname : "BattleResultView",  key : "_conBtn",  onlyshowHand : true, handpos : {x : 0, y : 0}},
		//16 主页，点击皇室令牌
		16 : {guidid : 16, period : 2,step : 1, nextId : 17, layer : `scene`, viewname : "ReadyScene", key : "_warOrder", descStr : "guideWarDesc20", showRect : true, showMask : true, descpos : {x : -180, y : -67-12-120}},
		//17 引导点击领取
		17 : {guidid : 17, period : 2, step : 2, showRect : true, layer : `view`, viewname : "RoyalPassView", key : "_curReward", descStr : "guideWarDesc21", descpos : {x : -30, y : -143-15-20}, showHand : true, handpos : {x : -170, y : 100}},	
		//18 点击前往按钮
		18 : {guidid : 18, period : 2, step : 3, layer : `popup`, viewname : "CommonRewardPopupView",  key : "_conBtn", showRect : true, onlyshowHand : true, handpos : {x : -40, y : 70}},
		//19 点击斩首鸟
		19 : {guidid : 19, period : 2, step : 4, showRect : true, layer : `scene|tab_1`, viewname : "DiceScene", key : "curDice", descStr : "guideWarDesc23", descpos : {x : 0, y : -143-15-70}, showHand : true, handpos : {x : 0, y : 0},},	
		//20 点击使用按钮
		20 : {guidid : 20, period : 2, step : 5, layer : `scene|tab_1`, viewname : "DiceScene", key : "curDice",  showRect : true, showHand : true, handpos : {x : 0, y : 100},  descStr : "guideWarDesc24", descpos : {x : 0, y : -143-15-70}},
		//21 点击五毒鸟替换下去
		21 : {guidid : 21, period : 2, step : 6, layer : `scene|tab_1`, viewname : "DiceScene", key : "_teamDice",  showRect : true, showHand : true, handpos : {x : 0, y : 0},  descStr : "guideWarDesc25", descpos : {x : -70, y : -143-15-70}},
		//24 返回对战界面
		24 : {guidid : 24, period : 2, step : 7, layer : `ui`, viewname : "MainUI", key : "_readyBtn",  showRect : true, showHand : true, handpos : {x : 0, y : 0},  descStr : "guideWarDesc26", descpos : {x : -70, y : -143-15-70}}, 
		//25 起名字
		25 : {guidid : 25, period : 4, step : 1, openview : true, viewname : "RenamePopupView", addtouch : true},
		//26 点击确认
		26 : {guidid : 26, period : 4, step : 2, layer : `popup`, viewname : "RenamePopupView",  key : "confirmBtn", showRect : true, onlyshowHand : true, handpos : {x : -40, y : 30}},
		//27 第二场战斗
		27 : {guidid : 27, period : 4, step : 3, layer : `scene`, viewname : "ReadyScene", key : "pvpBtn", descStr : "guideWarDesc12", showRect : true, showMask : true, descpos : {x : 0, y : -67-60-12-100-20}, needTouch : true,},

		//引导龙珠升级
		28 : {guidid : 28, period : 5, step : 1, nextId : 28, showRect : true, layer : `scene|tab_1`, viewname : "DiceScene", key : "curDice", descStr : "guideWarDesc13", descpos : {x : 0, y : -243-15},},	
		// 16 :  {guidid : 16, period : 4, step : 2, nextId : 17, showRect : true, layer : `popup`, viewname : "DiceDetailInfoView", key : "_levelBtn", descStr : "guideWarDesc16", descpos : {x : 0, y : -143-15}, showMask : true, showHand : true, handpos : {x : 0, y : 0},},	
		29 : {guidid : 29, period : 5, step : 2, nextId : 29, layer : `popup`,  showRect : true,viewname : "DiceDetailInfoView", key : "_levelBtn", onlyshowHand : true, handpos : {x : 0, y : 0},},	
		//暴击说明
		30 : {guidid : 30, period : 5, step : 3, showRect : true, layer : `scene|tab_1`, viewname : "DiceScene", key : "_critbg", descStr : "guideWarDesc14", descpos : {x : 0, y : -27-15-100}, ExtRect : {x : 15, y : 50, width : 30, height : 50}, addtouch : true, needTouch : true,},	
		//协作宝箱可开启说明
		31 : {guidid : 31, period : 5, step : 4, showRect : true, layer : `scene`, viewname : "ReadyScene", key : "taskBtn", descStr : "guideWarDesc15", descpos : {x : 300, y : -5}, showMask : true, showHand : true,  handpos : {x : 0, y : 0}, descWidth : 360},

		//协作模式引导
		32 : {guidid : 32, period : 6,step : 1, nextId : 33, layer : `view`, viewname : "Battle2View",  key : "_arrowGroup", showRect : true , descStr : "guideWarDesc27", addtouch : true, showNext : true,  needTouch : true, showMask : true, descWidth : 300},
		33 : {guidid : 33, period : 6,step : 2, layer : `view`, viewname : "Battle2View",  key : "_centerarrowGroup", showRect : true , descStr : "guideWarDesc28", addtouch : true, showNext : true,  needTouch : true, showMask : true,  descWidth : 300, descpos : {x : 0, y : -200},},
		34 : {guidid : 34, period : 6,step : 3, layer : `view`, viewname : "Battle2View",  key : "_totalGroup", showRect : true , descStr : "guideWarDesc29", addtouch : true, showNext : true,  needTouch : true, showMask : true,  descWidth : 300, descpos : {x : -300, y : 250}, showArrow : true, arrowpos : {x : -200, y : 50},},
	}

	export let anlyizeCfg:any = {
		//点击“对战模式”功能按钮
		1 : 30,
		//点击对站内“召唤小鸟”功能按钮
		3 : 40,
		//点击“召唤小鸟”功能按钮
		5 : 50,
		//点击“召唤小鸟”功能按钮
		7 : 60,
		//拖动小鸟合成
		9 : 70,
		//小鸟属性框
		10 : 80,
		//小鸟双倍攻速说明
		11 : 90,
		//战斗界面 powerup演示
		12 : 110,
		//怪物到达终点会扣红心
		13 : 120,
		//引导点击“奖励”功能按钮
		14 : 130,
		//引导点击“确定”功能按钮
		15 : 140,
		//点击皇室令牌
		16 : 150,
		//引导玩家点击“领取”功能按钮
		17 : 160,
		//点击恭喜获得界面中的“前往”功能按钮 
		18 : 170,
		//点击斩首鸟 
		19 : 180,
		//点击使用功能按钮 
		20 : 190,
		//点击巫毒鸟，上阵斩首鸟 
		21 : 200,
		//点击对战返回到首页 
		24 : 230,
		//成功进入起名界面 
		25 : 240,
		//点击起名确定按钮 
		26 : 250,
		//再次点击“对战模式” 
		27 : 9999,
	} 

	// export let anlyizeCfg:any = {
	// 	//开始加载（触发新手引导）
	// 	1 : 10,
	// 	//加载游戏到主界面
	// 	2 : 20,
	// 	//点击“对战模式”功能按钮
	// 	3 : 30,
	// 	//点击“快速匹配”功能按钮
	// 	4 : 40,
	// 	//配成到对手
	// 	5 : 50,
	// 	//点击对站内“召唤小鸟”功能按钮
	// 	6 : 60,
	// 	//点击“召唤小鸟”功能按钮
	// 	7 : 70,
	// 	//说明召唤小鸟增加sp消耗
	// 	8 : 80,
	// 	//点击“召唤小鸟”功能按钮
	// 	9 : 90,
	// 	//合并小鸟说明
	// 	10 : 100,
	// 	//拖动小鸟合成
	// 	11 : 110,
	// 	//介绍增幅功能
	// 	12 : 120,
	// 	//介绍消灭怪物结果
	// 	13 : 130,
	// 	//战斗引导结束说明
	// 	14 : 140,
	// 	//点击结算界面“奖励”功能按钮
	// 	15 : 150,
	// 	//点击确认功能按钮
	// 	16 : 160,
	// 	//成功进入起名界面
	// 	17 : 170,
	// 	//点击起名确定按钮
	// 	18 : 180,
	// 	//再次点击“对战模式”
	// 	19 : 9999,
	// } 
}