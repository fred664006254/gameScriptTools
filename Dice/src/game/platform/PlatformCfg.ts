namespace PlatformCfg 
{
	/**
	 * 绑定手机
	 */
	export let bindPhone={
		// "17001001":"1",
		// "17001051":"1",
		// "17001114":"1",
		// "17001139":"1"
	}

	export let weichatPub={

	}

	export let useSDK={
		"17001000":"0",
		"17001001":"1",
		"17001002":"1",
		"devsdk":"1"
	};
	/**
	 * 皇帝说话的最大限制
	 */
	export let emperortalkMaxNumberCfg={
		"th":40,
		"en":50,
		"other":30,

	};
	/**
	 * 聊天的最大字数配置
	 */
	export let chatMaxNumberCfg = {
		"en":120,
		"ru":120,
		"other":60,
	}
	export let closeSwitchAcount={
		"fkylc":"1",
		"wanba":"1",
		"jj":"1"
	}

	export let platNameCfg={
		"17001000":"3k",
		"17004000":"tw"
	}

	export let contactCfg={
		// "17001001":"客服电话:4009933348",
		"17001002":["客服QQ:3004776131","客服电话:400-993-3348"],
		"17001003-17001137":["客服QQ:3557595700"],
	}

	let statementStrCfg={
		"shangyi":`抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。
适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
适龄9+ 新广出审[2017]10497 号  ISBN 978-7-498-03283-6  
出版单位：方圆电子音像出版社有限责任公司 著作权人：天津尚易互动科技有限公司`,
	}

	export let statementCfg={
		"533002000":statementStrCfg.shangyi,
		"wx":statementStrCfg.shangyi
	};

	/**
	 * 配置的key标识不是充值档位，只是为了显示货币单位
	 */
	export let hwpriceCfg=[
		"acDiscount_yearcardDesc",
		"acDiscount_newyearcardDesc",
		"acWishTreeTip2",
		"acWishTreeBtnTxt1",
		"acWishTreeBtnTxt2",
		"firstRecharge1",
		"firstRecharge2",
		"firstRecharge3",
		"firstRecharge4",
	];

	/**
	 * 泰国使用google支付的档位
	 */
	export let th3RechargeCfg=[
	];

	/**
	 * 审核服新手引导完成后进入的功能
	 */
	export let shenheFunctionName="trade";
}