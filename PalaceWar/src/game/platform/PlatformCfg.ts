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
		"17005000":["官方QQ群：497564630"],//应用宝
		"17007001":["官方QQ群：641188812"],//疯狂游乐场
		"17003000":["官方QQ群：496098831"],//玩吧
		"17009000":["客服QQ:2198936198"],//享乐源
		"17009004-17009005":["客服QQ群: 724420901"],//支付宝即拓渠道
	}

	let statementStrCfg={
		"hantang":`审批文号：新广出审【2014】1247号  出版物号：ISBN-978-7-89988-124-8\n著作权人：杭州汉唐文化传播有限公司  出版服务单位：杭州汉唐文化传播有限公司\n备案文号：文网游备字〔2017〕Ｍ-RPG 1568 号  适龄提示：16岁以上`,
		"xiongdi":`审批文号：新广出审【2014】1247号  出版物号：ISBN-978-7-89988-124-8\n著作权人：天津齐天兄弟科技有限公司  出版服务单位：天津齐天兄弟科技有限公司\n备案文号：文网游备字〔2018〕Ｍ-RPG 0604 号  适龄提示：16岁以上`,
	}

	export let statementCfg={
		"17007000":statementStrCfg.hantang,
		"17003000":`审批文号：新广出审【2014】1247号  出版物号：ISBN-978-7-89988-124-8\n著作权人：杭州汉唐文化传播有限公司  出版服务单位：杭州汉唐文化传播有限公司\n公司备案号：津网文〔2016〕6371-082号 备案文号：文网游备字〔2017〕Ｍ-RPG 1638 号`,
		"17021000":statementStrCfg.hantang,
		"17023000":statementStrCfg.hantang,
		"17018011":statementStrCfg.hantang,
		"17009001":statementStrCfg.hantang,
		"17009002":statementStrCfg.hantang,
		"17009003":statementStrCfg.hantang,
		"17018000":statementStrCfg.hantang,
		"17020000":statementStrCfg.hantang,
		"17011000":statementStrCfg.hantang,
		"17022000":statementStrCfg.hantang,
		"17015000":statementStrCfg.hantang,
		"17005000":statementStrCfg.hantang,
		"17026000":statementStrCfg.hantang,
		"17018046":`新广出审【2017】6457号  ISBN：978-7-7979-9618-1\n著作权人：成都玩匠科技有限公司 运营单位名称：成都好玩一二三科技有限公司`,
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
	export let th3RechargeCfg=["g7","g8","g11",
		"g29","g30","g31","g32","g33","g34",
		"g36","g37","g38","g39","g40","g41","g42","g43","g44","g45","g46","g47","g48","g49",
		"g50", "g51", "g52", "g53", "g54", "g55", "g56", "g57", "g58", "g59", "g60", "g61", "g62", "g63", "g64","g65",
		"g67","g68","g69","g70","g71","g72","g73","g79","g80","g81","g82","g83","g84","g85","g86","g87","g88","g89",
		"g90","g91","g92","g93","g94","g95","g96","g97","g98","g99","g100","g101","g102","g103","g104","g105","g106","g107","g108","g109",
		"g110","g111","g115","g122","g123","g165","g167","g171","g172","g173","g174","g175","g176","g177","g181","g182","g183",
		"g191","g192","g193","g194","g195","g196","g201","g202",
	];

	/**
	 * 审核服新手引导完成后进入的功能
	 */
	export let shenheFunctionName="trade";
}