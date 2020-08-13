/**
 * 新手引导配置
 */
var RookieCfg;
(function (RookieCfg) {
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
     *
     * "clickContinue
     */
    var rookieCfg = {
        "storyEndId": "2",
        "storyEndIdBule": "3",
        "storyEndId2": "222",
        "storyStartId2": "3222",
        "guideStartId": "101",
        "storyMusicStart": "4",
        "storyMusicEnd": "11",
        "guideSteps": 14,
        // "fogId":"1",
        "guideEndId": "128",
        "shakeId": "4",
        //剧情
        "1": { "guideId": 4, "nextId": "2", "descId": 1, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "2": { "guideId": 5, "nextId": "3", "descId": 2, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "3": { "guideId": 6, "nextId": "4", "descId": 3, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        //告诉任务
        "4": { "guideId": 7, "nextId": "5", "tipId": "1", "tipPos": { x: 160, y: 600 }, "clickRect": { "x": 1, "y": 850, "w": 300, "h": 60, "fromBottom": 217 }, "touchAll": true, "unlock": 1 },
        //引导雇佣家丁
        "5": { "guideId": 8, "nextId": "6", "tipId": "2", "tipPos": { x: 160, y: 600 }, "clickRect": { "x": 260, "y": 330, "w": 110, "h": 105, fromBottom: 109 }, "handPos": { x: 304, y: 878, "fromBottom": 78 } },
        //显示家丁
        "6": { "guideId": 9, "nextId": "7", "tipId": "3", "tipPos": { x: 160, y: 680 }, "clickRect": { "x": 199, "y": 300, "w": 110, "h": 160 }, "touchAll": true, },
        //引导雇佣家丁
        "7": { "guideId": 10, "nextId": "8", "tipId": "4", "tipPos": { x: 160, y: 600 }, "clickRect": { "x": 260, "y": 300, "w": 110, "h": 105, fromBottom: 109 }, "handPos": { x: 305, y: 878, "fromBottom": 77 } },
        // //显示家丁
        // "8":{"guideId":11,"nextId":"9", "tipId":"5","tipPos":{x:160,y:660}, "clickRect":{"x":-10,"y":-10,"w":660,"h":1200},"touchAll":true,},
        //领取主线任务奖励
        "8": { "guideId": 11, "nextId": "9", "clickRect": { "x": 1, "y": 850, "w": 300, "h": 60, "fromBottom": 217 }, "handPos": { x: 133, y: 878, "fromBottom": 207 }, },
        //点领取按钮
        // "10":{"guideId":13,"nextId":"11", "clickRect":{"x":225,"y":600,"w":192,"h":65,"fromCenter":0.5},},
        // //关闭领取界面
        // "11":{"guideId":14,"nextId":"12","tipId":"6","tipPos":{x:160,y:750} , "clickRect":{"x":225,"y":600,"w":192,"h":65,"fromCenter":0.5},},
        //合成家丁
        "9": { "guideId": 12, "nextId": "10", "tipId": "7", "tipPos": { x: 162, y: 680 }, "clickRect": { "x": 189, "y": 280, "w": 280, "h": 200 }, "moveHand": true, "clickContinue": true },
        //解锁新等级
        "10": { "guideId": 13, "nextId": "11", "tipId": "8", "tipPos": { x: 160, y: 860 }, "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, },
        //主线任务
        "11": { "guideId": 14, "nextId": null, "tipId": "9", "tipPos": { x: 160, y: 660 }, "clickRect": { "x": 1, "y": 850, "w": 300, "h": 60, "fromBottom": 217 }, "handPos": { x: 133, y: 878, "fromBottom": 207 }, "unlock": 4 },
        //红颜
        // "14_1":{"guideId":18,"nextId":"14_2", "clickRect":{"x":490,"y":370,"w":130,"h":270,"fromBottom":670},"handPos":{x:535,y:500,"fromBottom":558},"isScenePos":"homeScene","sceneKey":"wife"},//箭头指向红颜NPC
        // "14_2":{"guideId":19,"nextId":"14_3", "clickRect":{"x":135,"y":673,"w":135,"h":40},"tipId":"wife_2","tipPos":{x:130,y:460},"touchAll":true},//圈红颜亲密度
        // "14_3":{"guideId":20,"nextId":"14_4", "clickRect":{"x":265,"y":673,"w":125,"h":40},"tipId":"wife_3","tipPos":{x:130,y:460},"touchAll":true},//圈红颜魅力
        // "14_4":{"guideId":21,"nextId":null, "clickRect":{"x":220,"y":318,"w":200,"h":70,"fromBottom":73},"handPos":{x:320,y:500,"fromBottom":35,"flipXY":true},"tipId":"wife_4","tipPos":{x:130,y:660},"waitNext":"14_5"},//圈随机传唤
        // "14_5":{"guideId":22,"nextId":"15", "clickRect":{"x":560,"y":5,"w":75,"h":75},"handPos":{x:612,y:32,"flip":true},"checkNpc":"manage"},//箭头指向关闭按钮
        // //府邸
        // "15":{"guideId":23,"nextId":"16", "descId":15, "bgId":6,"clickContinue":true,},
        // "16":{"guideId":24,"nextId":"17", "descId":16, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "17":{"guideId":25,"nextId":"18", "descId":17, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "18":{"guideId":26,"nextId":"19", "descId":18, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "19":{"guideId":27,"nextId":"20", "descId":19, "bgId":6,"clickContinue":true,},
        // "20":{"guideId":28,"nextId":"21", "descId":20, "bgId":6,"clickContinue":true,},
        // "21":{"guideId":29,"nextId":"22", "descId":21, "bgId":6,"personPic":"servant_full_1002","nameId":"servant_name1002","clickContinue":true,},
        // "22":{"guideId":30,"nextId":"23", "descId":22, "bgId":6,"personPic":"servant_full_1003","nameId":"servant_name1003","clickContinue":true,},
        // "23":{"guideId":31,"nextId":"24", "descId":23, "bgId":6,"personPic":"servant_full_1004","nameId":"servant_name1004","clickContinue":true,},
        // "24":{"guideId":32,"nextId":"25", "descId":24, "bgId":6,"personPic":"servant_full_1005","nameId":"servant_name1005","clickContinue":true,},
        // "25":{"guideId":33,"nextId":"26", "descId":25, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "26":{"guideId":34,"nextId":"101", "descId":26, "bgId":6,"clickContinue":true,"waitNext":101},
        // "101":{"guideId":35,"nextId":"102", "descId":101, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"105"},
        // "102":{"guideId":36,"nextId":"103", "clickRect":{"x":290,"y":370,"w":190,"h":350,"fromBottom":550},"handPos":{x:370,y:400,"fromBottom":400},"isScenePos":"homeScene","sceneKey":"manage"},//点营收NPC
        // "103":{"guideId":37,"nextId":"104",  "clickRect":{"x":155,"y":393,"w":200,"h":300,"fromBottom":490},"handPos":{x:260,y:580,"fromBottom":390},"tipId":"103","tipPos":{x:160,y:600,"fromBottom":140},},//点经商按钮
        // "104":{"guideId":38,"nextId":"105","clickRect":{"x":390,"y":193,"w":200,"h":300,"fromBottom":770},"handPos":{x:490,y:355,"fromBottom":650},"tipId":"104","tipPos":{x:150,y:460,"fromBottom":350},},//点经农按钮
        // "105":{"guideId":39,"nextId":"106_1", "clickRect":{"x":5,"y":753,"w":200,"h":300,"fromBottom":810},"handPos":{x:50,y:810,"fromBottom":660},"tipId":"105","tipPos":{x:130,y:350,"fromBottom":440},},//点招兵按钮
        // "106_1":{"guideId":40,"nextId":"106", "clickRect":{"x":560,"y":5,"w":75,"h":75},"handPos":{x:612,y:32,"flip":true}},//箭头指向关闭按钮
        // "106":{"guideId":41,"nextId":"107", "descId":106, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"109"},
        // "107":{"guideId":42,"nextId":"108", "clickRect":{"x":15,"y":850,"w":100,"h":100,"fromBottom":107},"handPos":{x:48,y:880,"fromBottom":73}},//点门客按钮
        // "108":{"guideId":43,"nextId":"108_1", "clickRect":{"x":8,"y":145,"w":200,"h":295},"handPos":{x:92,y:270}},//点门客
        // "108_1":{"guideId":44,"nextId":"108_2","clickRect":{"x":90,"y":540,"w":400,"h":70},"tipId":"1081","tipPos":{x:130,y:320},"touchAll":true},//圈门客属性
        // "108_2":{"guideId":45,"nextId":"108_3", "clickRect":{"x":20,"y":790,"w":600,"h":135},"tipId":"1082","tipPos":{x:130,y:550},"touchAll":true,"needLocalPos":true},//圈门客2本书
        // "108_3":{"guideId":46,"nextId":"109", "clickRect":{"x":60,"y":425,"w":510,"h":380,"fromCenter":0.5},"tipId":"1083","tipPos":{x:130,y:250},"touchAll":true,"needPush":true},//圈门客2个升级按钮
        // "109":{"guideId":47,"nextId":null, "clickRect":{"x":483,"y":581,"w":140,"h":60},"handPos":{x:540,y:600},"tipId":"109","tipPos":{x:130,y:450},"waitNext":111,"needPush":true,"showCloseHand":true},//点门客升级按钮
        // "111":{"guideId":48,"nextId":"112", "descId":111, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"120"},
        // "112":{"guideId":49,"nextId":"113", "clickRect":{"x":520,"y":850,"w":100,"h":100,"fromBottom":107},"handPos":{x:550,y:720,"fromBottom":70}},//箭头指向出府按钮
        // "113":{"guideId":50,"nextId":"114", "clickRect":{"x":250,"y":430,"w":170,"h":170},"handPos":{x:320,y:500}},//箭头指向关卡
        // "113_scroll":{"guideId":50,"nextId":"114", "clickRect":{"x":262,"y":794,"w":316,"h":222, fromBottom:360},"handPos":{x:420,y:794, fromBottom:249}, cityscenescroll:540},//箭头指向关卡
        // "114":{"guideId":51,"nextId":"115", "clickRect":{"x":162,"y":593,"w":116,"h":110,"fromCenter":0.5},"handPos":{x:208,y:630,"fromCenter":0.5}},//箭头指向第一个关卡
        // "115":{"guideId":52,"nextId":"116", "descId":115, "bgId":5,"clickContinue":true,"resEndId":"120"},
        // "116":{"guideId":53,"nextId":"117", "descId":116, "bgId":5,"clickContinue":true,},
        // "117":{"guideId":54,"nextId":"118", "descId":117, "bgId":5,"personPic":"story_npc_4","nameId":"storyNPCName3","clickContinue":true,},
        // "118":{"guideId":55,"nextId":"119", "descId":118, "bgId":5,"personPic":"story_npc_18","nameId":"storyNPCName2","clickContinue":true,},
        // "119":{"guideId":56,"nextId":"120", "descId":119, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "120":{"guideId":57,"nextId":null, "clickRect":{"x":210,"y":390,"w":220,"h":220,"fromCenter":0.5},"handPos":{x:320,y:500,"fromCenter":0.5},"waitNext":123},//箭头指向开始战斗
        // "123":{"guideId":58,"nextId":"124", "descId":123, "bgId":5,"clickContinue":true,"resEndId":"128"},
        // "124":{"guideId":59,"nextId":"125", "descId":124, "bgId":5,"personPic":"story_npc_4","nameId":"storyNPCName3","clickContinue":true,},
        // "125":{"guideId":60,"nextId":"126", "descId":125, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // // "125":{"guideId":61,"nextId":"126", "clickRect":{"x":565,"y":12,"w":75,"h":100},"handPos":{x:602,y:62}},//箭头指向关闭按钮
        // "126":{"guideId":61,"nextId":"127",  "clickRect":{"x":560,"y":5,"w":75,"h":75},"handPos":{x:612,y:32,"flip":true}},//箭头指向关闭按钮
        // "127":{"guideId":62,"nextId":"128", "clickRect":{"x":520,"y":850,"w":100,"h":100,"fromBottom":107},"handPos":{x:550,y:890,"fromBottom":70},"jpSpGuide":true,"waitNext":null},//箭头指向回府按钮
        // //"127_jpextra":{"guideId":63,"nextId":null, "jpSpGuide":true,"waitNext":128},
        // "128":{"guideId":64,"nextId":null, "clickRect":{"x":60,"y":850,"w":200,"h":60,"fromBottom":217},"handPos":{x:83,y:878,"fromBottom":187}},//箭头指向任务按钮
        //分阶段引导
        //子嗣
        "child_1": { "otherId": "child_1", "nextId": "child_2", "clickRect": { "x": 413, "y": 330, "w": 120, "h": 200, "fromBottom": 696 }, "handPos": { x: 270, y: 400, "fromBottom": 508 }, "isScenePos": "homeScene", "sceneKey": "child" },
        "child_2": { "otherId": "child_2", "nextId": "child_3", "clickRect": { "x": 110, "y": 395, "w": 300, "h": 75 }, "tipId": "child_2", "tipPos": { x: 130, y: 600 }, "touchAll": true },
        "child_3": { "otherId": "child_3", "nextId": "child_4", "clickRect": { "x": 475, "y": 445, "w": 140, "h": 60 }, "tipId": "child_3", "tipPos": { x: 130, y: 590 }, "touchAll": true },
        "child_4": { "otherId": "child_4", "nextId": null, "clickRect": { "x": 120, "y": 578, "w": 140, "h": 30 }, "tipId": "child_4", "tipPos": { x: 130, y: 300 }, "touchAll": true },
        //联姻
        "adult_1": { "otherId": "adult_1", "nextId": "adult_2", "clickRect": { "x": 120, "y": 370, "w": 130, "h": 170, "fromBottom": 690 }, "handPos": { x: 110, y: 340, "fromBottom": 618 }, "isScenePos": "homeScene", "sceneKey": "adult" },
        "adult_2": { "otherId": "adult_2", "nextId": "adult_3", "clickRect": { "x": 215, "y": 673, "w": 160, "h": 40, "fromBottom": 307 }, "tipId": "adult_2", "tipPos": { x: 130, y: 540 }, "touchAll": true },
        "adult_3": { "otherId": "adult_3", "nextId": "adult_4", "clickRect": { "x": 390, "y": 478, "w": 175, "h": 70, "fromBottom": 470 }, "tipId": "adult_3", "tipPos": { x: 130, y: 370 }, "touchAll": true },
        "adult_4": { "otherId": "adult_4", "nextId": null, "clickRect": { "x": 10, "y": 200, "w": 620, "h": 200 }, "tipId": "adult_4", "tipPos": { x: 130, y: 510 }, "touchAll": true, "needPush": true },
        //寻访
        "search_1": { "otherId": "search_1", "nextId": "search_2", "clickRect": { "x": 200, "y": 490, "w": 120, "h": 140 }, "handPos": { x: 250, y: 550 }, },
        "search_1_scroll": { "otherId": "search_1", "nextId": "search_2", "clickRect": { "x": 230, "y": 794, "w": 180, "h": 132, fromBottom: 604 }, "handPos": { x: 320, y: 794, fromBottom: 538 }, cityscenescroll: 640 },
        "search_2": { "otherId": "search_2", "nextId": "search_3", "clickRect": { "x": 464, "y": 318, "w": 160, "h": 60, "fromBottom": 68 }, "tipId": "search_2", "tipPos": { x: 130, y: 690 }, "touchAll": true },
        "search_3": { "otherId": "search_3", "nextId": "search_4", "clickRect": { "x": 50, "y": 293, "w": 540, "h": 560, "fromCenter": 0.5 }, "tipId": "search_3", "tipPos": { x: 130, y: 180 }, "touchAll": true, "needPush": true },
        "search_4": { "otherId": "search_4", "nextId": "search_5", "clickRect": { "x": 570, "y": 100, "w": 65, "h": 65, "fromCenter": 0.5 }, "handPos": { x: 597, y: 123, "fromCenter": 0.5 } },
        "search_5": { "otherId": "search_5", "nextId": null, "clickRect": { "x": 460, "y": 318, "w": 150, "h": 70, "fromBottom": 73 }, "handPos": { x: 560, y: 500, "fromBottom": 32, "flipXY": true }, "tipId": "search_4", "tipPos": { x: 130, y: 660 }, "touchAll": true },
        //牢房
        "prison_1": { "otherId": "prison_1", "nextId": "prison_2", "clickRect": { "x": 500, "y": 640, "w": 130, "h": 130 }, "handPos": { x: 570, y: 690 } },
        "prison_1_scroll": { "otherId": "prison_1", "nextId": "prison_2", "clickRect": { "x": 448, "y": 640, "w": 130, "h": 130, fromBottom: 440 }, "handPos": { x: 513, y: 690, fromBottom: 375 }, cityscenescroll: 1280 },
        "prison_2": { "otherId": "prison_2", "nextId": "prison_3", "clickRect": { "x": 40, "y": 270, "w": 540, "h": 500 }, "tipId": "prison_2", "tipPos": { x: 130, y: 800 }, "touchAll": true },
        "prison_3": { "otherId": "prison_3", "nextId": null, "clickRect": { "x": 114, "y": 73, "w": 80, "h": 80 }, "tipId": "prison_3", "tipPos": { x: 130, y: 240 }, "touchAll": true },
        //擂台
        "atkrace_1": { "otherId": "atkrace_1", "nextId": "atkrace_2", "clickRect": { "x": 410, "y": 350, "w": 160, "h": 160 }, "handPos": { x: 490, y: 410 }, },
        "atkrace_1_scroll": { "otherId": "atkrace_1", "nextId": "atkrace_2", "clickRect": { "x": 233, "y": 350, "w": 260, "h": 200, fromBottom: 425 }, "handPos": { x: 363, y: 410, fromBottom: 325 }, cityscenescroll: 0 },
        "atkrace_2": { "otherId": "atkrace_2", "nextId": "atkrace_3", "clickRect": { "x": 246, "y": 698, "w": 147, "h": 153, "fromBottom": 282 }, "tipId": "atkrace_2", "tipPos": { x: 130, y: 250 }, "touchAll": true, "needPush": true },
        "atkrace_3": { "otherId": "atkrace_3", "nextId": null, "waitNext": "atkrace_4", "clickRect": { "x": 481, "y": 805, "w": 130, "h": 52, "fromBottom": 138 }, "tipId": "atkrace_3", "tipPos": { x: 130, y: 620 }, "needPush": true },
        "atkrace_4": { "otherId": "atkrace_4", "nextId": null, "clickRect": { "x": 184, "y": 778, "w": 272, "h": 88, "fromCenter": 0.4 }, "tipId": "atkrace_4", "tipPos": { x: 130, y: 410 } },
        //酒楼
        "dinner_1": { "otherId": "dinner_1", "nextId": "dinner_2", "clickRect": { "x": 430, "y": 470, "w": 200, "h": 160 }, "handPos": { x: 520, y: 520 }, },
        "dinner_1_scroll": { "otherId": "dinner_1", "nextId": "dinner_2", "clickRect": { "x": 234, "y": 794, "w": 220, "h": 312, fromBottom: 492 }, "handPos": { x: 344, y: 794, fromBottom: 336 }, cityscenescroll: 910 },
        "dinner_2": { "otherId": "dinner_2", "nextId": "dinner_3", "clickRect": { "x": 230, "y": 300, "w": 180, "h": 150 }, "tipId": "dinner_2", "tipPos": { x: 130, y: 500 }, "touchAll": true },
        "dinner_3": { "otherId": "dinner_3", "nextId": "dinner_4", "clickRect": { "x": 50, "y": 560, "w": 540, "h": 250 }, "tipId": "dinner_3", "tipPos": { x: 130, y: 440 }, "touchAll": true },
        "dinner_4": { "otherId": "dinner_4", "nextId": null, "clickRect": { "x": 48, "y": 125, "w": 540, "h": 230, "fromCenter": 0.5 }, "tipId": "dinner_4", "tipPos": { x: 130, y: 460 }, "touchAll": true, "needPush": true },
        //第一次关卡失败引导
        "firstchallengefail_1": { "otherId": "firstchallengefail_1", "nextId": null, "clickRect": { "x": 20, "y": 470, "w": 600, "h": 260, "fromBottom": 304 }, "touchAll": true, "tipId": "firstchallengefail_1", "tipPos": { x: 130, y: 550 } },
        //范蠡传
        "fanliReview_1": { "otherId": "fanliReview_1", "nextId": "fanliReview_2", "nameId": null, "personPic": null, "descId": 5000, "clickContinue": true, "hideBlackBg": true, bgId: null },
        "fanliReview_2": { "otherId": "fanliReview_2", "nextId": "fanliReview_3", "nameId": "storyNPCName1", "personPic": 1, "descId": 5001, "clickContinue": true, "hideBlackBg": true, bgId: null },
        "fanliReview_3": { "otherId": "fanliReview_3", "nextId": "fanliReview_4", "nameId": "servant_name1034", "personPic": "servant_full_1034", "descId": 5002, "clickContinue": true, "hideBlackBg": true, bgId: null },
        "fanliReview_4": { "otherId": "fanliReview_4", "nextId": "fanliReview_5", "nameId": null, "personPic": null, "descId": 5003, "clickContinue": true, "hideBlackBg": true, bgId: null },
        "fanliReview_5": { "otherId": "fanliReview_5", "nextId": "fanliReview_6", "nameId": "storyNPCName1", "personPic": 1, "descId": 5004, "clickContinue": true, "hideBlackBg": true, bgId: null },
        "fanliReview_6": { "otherId": "fanliReview_6", "nextId": null, "nameId": "servant_name1034", "personPic": "servant_full_1034", "descId": 5005, "clickContinue": true, "hideBlackBg": true, bgId: null },
        //红颜对战
        "wifebattle_1": { "otherId": "wifebattle_1", "nextId": "wifebattle_2", "clickRect": { "x": -100, "y": 0, "w": 0, "h": 0 }, "tipId": "wifebattle_1", "tipPos": { x: 130, y: 400 }, "touchAll": true },
        "wifebattle_2": { "otherId": "wifebattle_2", "nextId": "wifebattle_3", "clickRect": { "x": -100, "y": 0, "w": 0, "h": 0 }, "tipId": "wifebattle_2", "tipPos": { x: 130, y: 400 }, "touchAll": true },
        "wifebattle_3": { "otherId": "wifebattle_3", "nextId": "wifebattle_4", "clickRect": { "x": 100, "y": 560, "w": 440, "h": 525, fromBottom: 850 }, "tipId": "wifebattle_3", "tipPos": { x: 130, y: 700 }, "touchAll": true },
        "wifebattle_4": { "otherId": "wifebattle_4", "nextId": "wifebattle_5", "clickRect": { "x": 18, "y": 560, "w": 80, "h": 80, fromBottom: 190 }, "tipId": "wifebattle_4", "tipPos": { x: 130, y: 650 }, "touchAll": true },
        "wifebattle_5": { "otherId": "wifebattle_5", "nextId": null, "clickRect": { "x": 542, "y": 125, "w": 86, "h": 168, "fromBottom": 270 }, "tipId": "wifebattle_5", "tipPos": { x: 130, y: 650 }, "touchAll": true },
        //士兵和粮食
        "soldier_1": { "otherId": "soldier_1", "nextId": "soldier_2", "descId": 10001, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "soldier_2": { "otherId": "soldier_2", "nextId": "soldier_3", "clickRect": { "x": 300, "y": 50, "w": 330, "h": 50 }, "tipId": "10002", "tipPos": { x: 130, y: 145 }, "touchAll": true, "unlock": 5 },
        "soldier_3": { "otherId": "soldier_3", "nextId": null, "descId": 10003, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        //升官
        "levelup_1": { "otherId": "levelup_1", "nextId": "levelup_2", "descId": 20001, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "levelup_2": { "otherId": "levelup_2", "nextId": "levelup_3", "descId": 20002, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "levelup_3": { "otherId": "levelup_3", "nextId": "levelup_4", "clickRect": { "x": 5, "y": 5, "w": 110, "h": 110 }, "handPos": { x: 50, y: 50 }, },
        "levelup_4": { "otherId": "levelup_4", "nextId": "levelup_5", "clickRect": { "x": 450, "y": 300, "w": 140, "h": 60, fromBottom: 122 } },
        "levelup_5": { "otherId": "levelup_5", "nextId": "levelup_6", "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, },
        "levelup_6": { "otherId": "levelup_6", "nextId": null, "descId": 20003, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        //关卡
        "challenge_1": { "otherId": "challenge_1", "nextId": "challenge_2", "personPic": "story_man2", "descId": 30001, "nameId": "storyNPCName01", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "challenge_2": { "otherId": "challenge_2", "nextId": "challenge_3", "personPic": 1, "descId": 30002, "nameId": "storyNPCName1", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "challenge_3": { "otherId": "challenge_3", "nextId": "challenge_4", "personPic": "story_man2", "descId": 30003, "nameId": "storyNPCName01", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "challenge_4": { "otherId": "challenge_4", "nextId": "challenge_5", "descId": 30004, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "challenge_5": { "otherId": "challenge_5", "nextId": "challenge_6", "clickRect": { "x": 10, "y": 520, "w": 180, "h": 150, fromBottom: 460 }, "handPos": { x: 90, y: 580, fromBottom: 420 }, "unlock": 6, needLocalPos: true },
        "challenge_6": { "otherId": "challenge_6", "nextId": null, "clickRect": { "x": 162, "y": 593, "w": 116, "h": 110, "fromCenter": 0.5 }, "handPos": { x: 208, y: 630, "fromCenter": 0.5 } },
        // "challenge_7":{"otherId":"challenge_7","nextId":null,"clickRect":{"x":-10,"y":-10,"w":660,"h":1200},},//打关卡界面
        // "challenge_9":{"otherId":"challenge_9","nextId":null,"descId":30006, "nameId":"servant_name1001","clickContinue":true,"showGrayMask":true,"touchAll":true},
        //征收
        "levy_1": { "otherId": "levy_1", "nextId": "levy_2", "descId": 50001, "personPic": "servant_full_1001", "nameId": "servant_name1001", "needPush": true, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "levy_2": { "otherId": "levy_2", "nextId": "levy_3", "descId": 50002, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "needPush": true, "showGrayMask": true, "touchAll": true },
        "levy_3": { "otherId": "levy_3", "nextId": "levy_4", "clickRect": { "x": 137, "y": 300, "w": 100, "h": 100, fromBottom: 104 }, "unlock": 8 },
        "levy_4": { "otherId": "levy_4", "nextId": "levy_5", "tipId": "50003", "tipPos": { x: 230, y: 470 }, "clickRect": { "x": 10, "y": 122, "w": 620, "h": 290 }, "touchAll": true },
        "levy_5": { "otherId": "levy_5", "nextId": "levy_6", "tipId": "50004", "tipPos": { x: 430, y: 300 }, "clickRect": { "x": 10, "y": 430, "w": 620, "h": 290 }, "touchAll": true },
        "levy_6": { "otherId": "levy_6", "nextId": "levy_7", "tipId": "50005", "tipPos": { x: 430, y: 490 }, "clickRect": { "x": 430, "y": 640, "w": 170, "h": 70 }, "handPos": { x: 500, y: 660 } },
        "levy_7": { "otherId": "levy_7", "nextId": "levy_8", "clickRect": { "x": 258, "y": 320, "w": 130, "h": 130, fromCenter: 0.5 }, "handPos": { x: 310, y: 365, fromCenter: 0.5 } },
        "levy_8": { "otherId": "levy_8", "nextId": "levy_9", "clickRect": { "x": 410, "y": 243, "w": 170, "h": 70, fromCenter: 0.5 }, "handPos": { x: 480, y: 264, fromCenter: 0.5 } },
        "levy_9": { "otherId": "levy_9", "nextId": "levy_10", "tipId": "50006", "tipPos": { x: 430, y: 450 }, "clickRect": { "x": 70, "y": 243, "w": 500, "h": 40, fromCenter: 0.5 }, "touchAll": true },
        "levy_10": { "otherId": "levy_10", "nextId": null, "descId": 50007, "personPic": "servant_full_1001", "nameId": "servant_name1001", "needPush": true, "clickContinue": true, "showGrayMask": true, "touchAll": true, "waitNext": "batchcompose_1" },
        //批量合成
        "batchcompose_1": { "otherId": "batchcompose_1", "nextId": "batchcompose_2", "descId": 110001, "personPic": "servant_full_1001", "nameId": "servant_name1001", "needPush": true, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "batchcompose_2": { "otherId": "batchcompose_2", "nextId": null, "descId": 110002, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "needPush": true, "showGrayMask": true, "touchAll": true },
        //门客元芳
        "servant_1": { "otherId": "servant_1", "nextId": "servant_2", "descId": 40001, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant_2": { "otherId": "servant_2", "nextId": "servant_3", "descId": 40002, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant_3": { "otherId": "servant_3", "nextId": "servant_4", "descId": 40003, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant_4": { "otherId": "servant_4", "nextId": "servant_5", "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, "needPush": true },
        "servant_5": { "otherId": "servant_5", "nextId": "servant_6", "clickRect": { "x": 565, "y": 5, "w": 75, "h": 75 }, "handPos": { x: 617, y: 32, "flip": true } },
        "servant_6": { "otherId": "servant_6", "nextId": "servant_7", "clickRect": { "x": 17, "y": 300, "w": 100, "h": 100, fromBottom: 104 }, "unlock": 8 },
        "servant_7": { "guideId": "servant_7", "nextId": "servant_8", "clickRect": { "x": 14, "y": 143, "w": 200, "h": 295 }, "handPos": { x: 92, y: 270 } },
        "servant_8": { "guideId": "servant_8", "nextId": "servant_9", "clickRect": { "x": 90, "y": 540, "w": 400, "h": 70 }, "tipId": "1081", "tipPos": { x: 130, y: 320 }, "touchAll": true },
        "servant_9": { "guideId": "servant_9", "nextId": "servant_10", "clickRect": { "x": 20, "y": 780, "w": 600, "h": 135 }, "tipId": "1082", "tipPos": { x: 130, y: 550 }, "touchAll": true, "needLocalPos": true },
        "servant_10": { "guideId": "servant_10", "nextId": "servant_11", "clickRect": { "x": 60, "y": 425, "w": 510, "h": 380, "fromCenter": 0.5 }, "tipId": "1083", "tipPos": { x: 130, y: 250 }, "touchAll": true, "needPush": true },
        "servant_11": { "guideId": "servant_11", "nextId": null, "clickRect": { "x": 488, "y": 582, "w": 140, "h": 60 }, "handPos": { x: 540, y: 600 }, "tipId": "109", "tipPos": { x: 130, y: 450 }, "touchAll": true, "needPush": true },
        //门客苏乞儿
        "servant2_1": { "otherId": "servant2_1", "nextId": "servant2_2", "descId": 60001, "personPic": "servant_full_1004", "nameId": "servant_name1004", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant2_2": { "otherId": "servant2_2", "nextId": "servant2_3", "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, "needPush": true },
        "servant2_3": { "otherId": "servant2_3", "nextId": null, "clickRect": { "x": 565, "y": 5, "w": 75, "h": 75 }, "handPos": { x: 617, y: 26, "flip": true }, "needPush": true },
        //门客纪晓岚
        "servant3_1": { "otherId": "servant3_1", "nextId": "servant3_2", "descId": 70001, "personPic": "servant_full_1005", "nameId": "servant_name1005", "clickContinue": true },
        "servant3_2": { "otherId": "servant3_2", "nextId": "servant3_3", "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, "needPush": true, },
        "servant3_3": { "otherId": "servant3_3", "nextId": null, "clickRect": { "x": 565, "y": 5, "w": 75, "h": 75 }, "handPos": { x: 617, y: 26, "flip": true } },
        //门客刘墉
        "servant4_1": { "otherId": "servant4_1", "nextId": "servant4_2", "descId": 80001, "personPic": "servant_full_1002", "nameId": "servant_name1002", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant4_2": { "otherId": "servant4_2", "nextId": "servant4_3", "descId": 80002, "personPic": "servant_full_1002", "nameId": "servant_name1002", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant4_3": { "otherId": "servant4_3", "nextId": "servant4_4", "descId": 80003, "personPic": "servant_full_1002", "nameId": "servant_name1002", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "servant4_4": { "otherId": "servant4_4", "nextId": "servant4_5", "clickRect": { "x": -10, "y": -10, "w": 660, "h": 1200 }, "needPush": true },
        "servant4_5": { "otherId": "servant4_5", "nextId": "servant4_6", "clickRect": { "x": 565, "y": 5, "w": 75, "h": 75 }, "handPos": { x: 617, y: 26, "flip": true }, "needPush": true, "waitNext": "servant4_6" },
        "servant4_6": { "otherId": "servant4_6", "nextId": null, "descId": 1, "personPic": "servant_full_1002", "nameId": "servant_name1002", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        //进城
        "city_1": { "otherId": "city_1", "nextId": "city_2", "descId": 90004, "clickContinue": true },
        "city_2": { "otherId": "city_2", "nextId": "city_3", "clickRect": { "x": 521, "y": 300, "w": 100, "h": 100, fromBottom: 104 }, "unlock": 9, "handPos": { x: 560, y: 50, fromBottom: 70 } },
        "city_3": { "otherId": "city_3", "nextId": "city_4", "clickRect": { "x": 350, "y": 360, "w": 230, "h": 170, fromBottom: 550 }, "handPos": { x: 460, y: 440, fromBottom: 500 } },
        "city_4": { "otherId": "city_4", "nextId": "city_5", "descId": 90005, "clickContinue": true },
        "city_5": { "otherId": "city_5", "nextId": "city_6", "descId": 90006, "personPic": "wife_full_101", "nameId": "wifeName_101", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "city_6": { "otherId": "city_6", "nextId": "city_7", "descId": 90007, "personPic": "wife_full_101", "nameId": "wifeName_101", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "city_7": { "otherId": "city_7", "nextId": "city_8", "descId": 90008, "personPic": "wife_full_101", "nameId": "wifeName_101", "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "city_8": { "otherId": "city_8", "nextId": "city_9", "clickRect": { "x": 490, "y": 370, "w": 130, "h": 270, "fromBottom": 670 }, "handPos": { x: 535, y: 500, "fromBottom": 558 }, "isScenePos": "homeScene", "sceneKey": "wife" },
        "city_9": { "otherId": "city_9", "nextId": "city_10", "clickRect": { "x": 135, "y": 673, "w": 135, "h": 40 }, "tipId": "wife_2", "tipPos": { x: 130, y: 460 }, "touchAll": true },
        "city_10": { "otherId": "city_10", "nextId": "city_11", "clickRect": { "x": 265, "y": 673, "w": 125, "h": 40 }, "tipId": "wife_3", "tipPos": { x: 130, y: 460 }, "touchAll": true },
        "city_11": { "otherId": "city_11", "nextId": null, "clickRect": { "x": 220, "y": 318, "w": 200, "h": 70, "fromBottom": 73 }, "handPos": { x: 320, y: 500, "fromBottom": 35, "flipXY": true }, "tipId": "wife_4", "tipPos": { x: 130, y: 660 }, },
        //删除小人
        "delperson_1": { "otherId": "delperson_1", "nextId": null, "tipId": "100001", "tipPos": { x: 430, y: 650 }, "clickRect": { "x": 50, "y": 340, "w": 540, "h": 240 }, needPush: true, "touchAll": true },
        //打完第十章引导
        "challengeTen_1": { "otherId": "challengeTen_1", "nextId": "challengeTen_2", "descId": 90002, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "challengeTen_2": { "otherId": "challengeTen_2", "nextId": null, "descId": 90003, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        //一键秒杀引导
        "aotoPush_1": { "otherId": "aotoPush_1", "nextId": "aotoPush_2", "descId": 120001, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        "aotoPush_2": { "otherId": "aotoPush_2", "tipId": 120002, "tipPos": { x: 430, y: 650 }, "nextId": null, "clickRect": { "x": 495, "y": 640, "w": 125, "h": 160, "fromBottom": 170 }, "handPos": { x: 550, y: 690, "fromBottom": 150 } },
        //一键购买引导
        "oneClickBuy_1": { "otherId": "oneClickBuy_1", "nextId": "oneClickBuy_2", "descId": 130001, "clickContinue": true, "showGrayMask": true, "touchAll": true },
        // "oneClickBuy_2":{"otherId":"oneClickBuy_2",  "nextId":null,"tipId":130002,"tipPos":{x:160,y:600} ,"clickRect":{"x":260,"y":330,"w":110,"h":105,fromBottom:109},"handPos":{x:304,y:878,"fromBottom":78}},
        "oneClickBuy_2": { "otherId": "oneClickBuy_2", "nextId": null, "tipId": 130002, "tipPos": { x: 160, y: 600 }, "clickRect": { "x": 260, "y": 330, "w": 110, "h": 105, fromBottom: 109 }, "touchAll": true },
        //成就
        // "dailyTask_1":{"otherId":"dailyTask_1","nextId":"dailyTask_2", "clickRect":{"x":213,"y":330,"w":90,"h":95,"fromBottom":100},"handPos":{x:240,y:400,"fromBottom":90}},//箭头指向子嗣NPC
        "dailyTask_1": { "otherId": "dailyTask_1", "nextId": "dailyTask_2", "clickRect": { "x": 14, "y": 280, "w": 610, "h": 159 }, "tipId": "dailyTask_1", "tipPos": { x: 130, y: 600 }, "touchAll": true },
        "dailyTask_2": { "otherId": "dailyTask_2", "nextId": "dailyTask_3", "clickRect": { "x": 450, "y": 140, "w": 80, "h": 80 }, "handPos": { x: 470, y: 160 } },
        "dailyTask_3": { "otherId": "dailyTask_3", "nextId": "dailyTask_4", "clickRect": { "x": 55, "y": 295, "w": 530, "h": 175, "fromCenter": 0.5 }, "tipId": "dailyTask_3", "tipPos": { x: 130, y: 630 }, "touchAll": true },
        "dailyTask_4": { "otherId": "dailyTask_4", "nextId": null, "clickRect": { "x": 55, "y": 470, "w": 530, "h": 295, "fromCenter": 0.5 }, "tipId": "dailyTask_4", "tipPos": { x: 130, y: 355 }, "touchAll": true },
    };
    function getRookieCfg(key) {
        if (Api.switchVoApi.checkScrollCityScene() && rookieCfg[key + "_scroll"]) {
            return rookieCfg[key + "_scroll"];
        }
        else {
            return rookieCfg[key];
        }
    }
    RookieCfg.getRookieCfg = getRookieCfg;
})(RookieCfg || (RookieCfg = {}));
