var PlatformCfg;
(function (PlatformCfg) {
    /**
     * 绑定手机
     */
    PlatformCfg.bindPhone = {
    // "17001001":"1",
    // "17001051":"1",
    // "17001114":"1",
    // "17001139":"1"
    };
    PlatformCfg.weichatPub = {};
    PlatformCfg.useSDK = {
        "17001000": "0",
        "17001001": "1",
        "17001002": "1",
        "devsdk": "1"
    };
    /**
     * 皇帝说话的最大限制
     */
    PlatformCfg.emperortalkMaxNumberCfg = {
        "th": 40,
        "en": 50,
        "other": 30
    };
    /**
     * 聊天的最大字数配置
     */
    PlatformCfg.chatMaxNumberCfg = {
        "en": 120,
        "ru": 120,
        "other": 60
    };
    PlatformCfg.closeSwitchAcount = {
        "fkylc": "1",
        "wanba": "1",
        "jj": "1"
    };
    PlatformCfg.platNameCfg = {
        "17001000": "3k",
        "17004000": "tw"
    };
    PlatformCfg.contactCfg = {
        // "17001001":"客服电话:4009933348",
        "17001002": ["客服QQ:3004776131", "客服电话:400-993-3348"],
        "17001003-17001137": ["客服QQ:3557595700"],
        "17005000": ["官方QQ群：497564630"],
        "17007001": ["官方QQ群：641188812"],
        "17003000": ["官方QQ群：496098831"],
        "17009000": ["客服QQ:2198936198"],
        "17009004-17009005": ["客服QQ群: 724420901"]
    };
    var statementStrCfg = {
        "hantang": "\u5BA1\u6279\u6587\u53F7\uFF1A\u65B0\u5E7F\u51FA\u5BA1\u30102014\u30111247\u53F7  \u51FA\u7248\u7269\u53F7\uFF1AISBN-978-7-89988-124-8\n\u8457\u4F5C\u6743\u4EBA\uFF1A\u676D\u5DDE\u6C49\u5510\u6587\u5316\u4F20\u64AD\u6709\u9650\u516C\u53F8  \u51FA\u7248\u670D\u52A1\u5355\u4F4D\uFF1A\u676D\u5DDE\u6C49\u5510\u6587\u5316\u4F20\u64AD\u6709\u9650\u516C\u53F8\n\u5907\u6848\u6587\u53F7\uFF1A\u6587\u7F51\u6E38\u5907\u5B57\u30142017\u3015\uFF2D-RPG 1568 \u53F7  \u9002\u9F84\u63D0\u793A\uFF1A16\u5C81\u4EE5\u4E0A",
        "xiongdi": "\u5BA1\u6279\u6587\u53F7\uFF1A\u65B0\u5E7F\u51FA\u5BA1\u30102014\u30111247\u53F7  \u51FA\u7248\u7269\u53F7\uFF1AISBN-978-7-89988-124-8\n\u8457\u4F5C\u6743\u4EBA\uFF1A\u5929\u6D25\u9F50\u5929\u5144\u5F1F\u79D1\u6280\u6709\u9650\u516C\u53F8  \u51FA\u7248\u670D\u52A1\u5355\u4F4D\uFF1A\u5929\u6D25\u9F50\u5929\u5144\u5F1F\u79D1\u6280\u6709\u9650\u516C\u53F8\n\u5907\u6848\u6587\u53F7\uFF1A\u6587\u7F51\u6E38\u5907\u5B57\u30142018\u3015\uFF2D-RPG 0604 \u53F7  \u9002\u9F84\u63D0\u793A\uFF1A16\u5C81\u4EE5\u4E0A"
    };
    PlatformCfg.statementCfg = {
        "17007000": statementStrCfg.hantang,
        "17003000": "\u5BA1\u6279\u6587\u53F7\uFF1A\u65B0\u5E7F\u51FA\u5BA1\u30102014\u30111247\u53F7  \u51FA\u7248\u7269\u53F7\uFF1AISBN-978-7-89988-124-8\n\u8457\u4F5C\u6743\u4EBA\uFF1A\u676D\u5DDE\u6C49\u5510\u6587\u5316\u4F20\u64AD\u6709\u9650\u516C\u53F8  \u51FA\u7248\u670D\u52A1\u5355\u4F4D\uFF1A\u676D\u5DDE\u6C49\u5510\u6587\u5316\u4F20\u64AD\u6709\u9650\u516C\u53F8\n\u516C\u53F8\u5907\u6848\u53F7\uFF1A\u6D25\u7F51\u6587\u30142016\u30156371-082\u53F7 \u5907\u6848\u6587\u53F7\uFF1A\u6587\u7F51\u6E38\u5907\u5B57\u30142017\u3015\uFF2D-RPG 1638 \u53F7",
        "17021000": statementStrCfg.hantang,
        "17023000": statementStrCfg.hantang,
        "17018011": statementStrCfg.hantang,
        "17009001": statementStrCfg.hantang,
        "17009002": statementStrCfg.hantang,
        "17009003": statementStrCfg.hantang,
        "17018000": statementStrCfg.hantang,
        "17020000": statementStrCfg.hantang,
        "17011000": statementStrCfg.hantang,
        "17022000": statementStrCfg.hantang,
        "17015000": statementStrCfg.hantang,
        "17005000": statementStrCfg.hantang,
        "17026000": statementStrCfg.hantang,
        "17018046": "\u65B0\u5E7F\u51FA\u5BA1\u30102017\u30116457\u53F7  ISBN\uFF1A978-7-7979-9618-1\n\u8457\u4F5C\u6743\u4EBA\uFF1A\u6210\u90FD\u73A9\u5320\u79D1\u6280\u6709\u9650\u516C\u53F8 \u8FD0\u8425\u5355\u4F4D\u540D\u79F0\uFF1A\u6210\u90FD\u597D\u73A9\u4E00\u4E8C\u4E09\u79D1\u6280\u6709\u9650\u516C\u53F8"
    };
    /**
     * 配置的key标识不是充值档位，只是为了显示货币单位
     */
    PlatformCfg.hwpriceCfg = [
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
    PlatformCfg.th3RechargeCfg = ["g7", "g8", "g11",
        "g29", "g30", "g31", "g32", "g33", "g34",
        "g36", "g37", "g38", "g39", "g40", "g41", "g42", "g43", "g44", "g45", "g46", "g47", "g48", "g49",
        "g50", "g51", "g52", "g53", "g54", "g55", "g56", "g57", "g58", "g59", "g60", "g61", "g62", "g63", "g64", "g65",
        "g67", "g68", "g69", "g70", "g71", "g72", "g73", "g79", "g80", "g81", "g82", "g83", "g84", "g85", "g86", "g87", "g88", "g89",
        "g90", "g91", "g92", "g93", "g94", "g95", "g96", "g97", "g98", "g99", "g100", "g101", "g102", "g103", "g104", "g105", "g106", "g107", "g108", "g109",
        "g110", "g111", "g115", "g122", "g123", "g165", "g167", "g171", "g172", "g173", "g174", "g175", "g176", "g177", "g181", "g182", "g183",
        "g191", "g192", "g193", "g194", "g195", "g196",
    ];
    /**
     * 审核服新手引导完成后进入的功能
     */
    PlatformCfg.shenheFunctionName = "trade";
})(PlatformCfg || (PlatformCfg = {}));
//# sourceMappingURL=PlatformCfg.js.map