var Config;
(function (Config) {
    var SceneeffectCfg;
    (function (SceneeffectCfg) {
        var effectCfg = {
            "202": {
                "childa": [{ "pos": { "x": 397, "y": 575 }, "frames": 6 }],
                "oldsmoker": [{ "pos": { "x": 136, "y": 594 }, "frames": 6 }],
                "oldman": [{ "pos": { "x": 112, "y": 602 }, "frames": 6 }],
                "cop": [{ "pos": { "x": 166, "y": 592 }, "frames": 1, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }],
                //城门守卫
                "guarder_1": [{ "pos": { "x": 220, "y": 915 }, "frames": 6, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }, { "frames": 6, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }],
                "guarder_2": [{ "pos": { "x": 140, "y": 948 }, "frames": 6, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }, { "frames": 6, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }],
                //街道上行走的玫红色衣服女人
                "woman": [{ "pos": { "x": 185, "y": 689 }, "pos2": { "x": 441, "y": 602 }, "frames": 6, "movetime": 18 }, { "wait": 12 }],
                //街道上行走的拄拐老人
                "walkman": [{ "pos": { "x": -37, "y": 739 }, "pos2": { "x": 470, "y": 586 }, "frames": 6, "movetime": 47 }, { "pos": { "x": 470, "y": 586 }, "pos2": { "x": -37, "y": 739 }, "frames": 6, "movetime": 47 },],
                //蓝马褂挑衅者
                "blueman": [{ "pos": { "x": 571, "y": 474 }, "pos2": { "x": 466, "y": 495 }, "frames": 4, "movetime": 8 }, { "frames": 4, "timeinter": [1, 1] }, { "pos": { "x": 466, "y": 495 }, "pos2": { "x": 571, "y": 474 }, "frames": 4, "movetime": 4 }, { "wait": 12 }],
                //武道家 追赶者
                "master": [{ "wait": 4 }, { "pos": { "x": 392, "y": 512 }, "pos2": { "x": 441, "y": 502 }, "frames": 4, "movetime": 5 }, { "pos": { "x": 441, "y": 502 }, "pos2": { "x": 561, "y": 474 }, "frames": 4, "movetime": 4 }, { "wait": 12 }],
                //搬运工
                "stevedore": [{ "pos": { "x": 469, "y": 418 }, "frames": 12 }],
                //帮会争执
                "debate": [{ "pos": { "x": 319, "y": 581 }, "frames": 12 }],
                //巡逻兵
                "cruise_1": [{ "pos": { "x": 214, "y": 392 }, "pos2": { "x": 309, "y": 433 }, "frames": 4, "movetime": 20 }, { "pos": { "x": 305, "y": 431 }, "pos2": { "x": 210, "y": 390 }, "frames": 4, "movetime": 20 }],
                "cruise_2": [{ "pos": { "x": 369, "y": 419 }, "pos2": { "x": 268, "y": 384 }, "frames": 4, "movetime": 20 }, { "pos": { "x": 272, "y": 386 }, "pos2": { "x": 374, "y": 421 }, "frames": 4, "movetime": 20 }],
                //打更者
                "dageng": [{ "pos": { "x": -37, "y": 739 }, "pos2": { "x": 536, "y": 568 }, "frames": 6, "movetime": 45 }, { "pos": { "x": 532, "y": 568 }, "pos2": { "x": 643, "y": 633 }, "frames": 6, "movetime": 10 }, { "wait": 12 }],
            },
            "203": {
                "childa": [{ "pos": { "x": 451, "y": 728 }, "frames": 6 }],
                "oldsmoker": [{ "pos": { "x": 157, "y": 622 }, "frames": 6 }],
                "cop": [{ "pos": { "x": 213, "y": 612 }, "frames": 1, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }],
                "walkman": [{ "pos": { "x": 0, "y": 677 }, "pos2": { "x": 471, "y": 578 }, "frames": 6, "movetime": 47 }, { "pos": { "x": 471, "y": 578 }, "pos2": { "x": 0, "y": 677 }, "frames": 6, "movetime": 47 },],
            },
            "204": {
                "oldman": [{ "pos": { "x": 190, "y": 622 }, "frames": 6 }],
                "debate": [{ "pos": { "x": 307, "y": 793 }, "frames": 12 }],
                "dageng_2": [
                    { "framekey": 2, "pos": { "x": 320, "y": 1145 }, "pos2": { "x": 185, "y": 879 }, "frames": 6, "movetime": 16 },
                    { "framekey": 0, "pos": { "x": 185, "y": 879 }, "pos2": { "x": 504, "y": 777 }, "frames": 6, "movetime": 20 },
                    { "framekey": 3, "pos": { "x": 504, "y": 777 }, "pos2": { "x": 185, "y": 879 }, "frames": 6, "movetime": 20 },
                    { "framekey": 1, "pos2": { "x": 320, "y": 1145 }, "pos": { "x": 185, "y": 879 }, "frames": 6, "movetime": 16 },
                ],
                "dageng_1": [
                    { "framekey": 2, "pos": { "x": 640, "y": 610 }, "pos2": { "x": 405, "y": 488 }, "frames": 6, "movetime": 18 },
                    { "framekey": 1, "pos2": { "x": 640, "y": 610 }, "pos": { "x": 405, "y": 488 }, "frames": 6, "movetime": 18 },
                ],
            },
            "303": {
                "oldman": [{ "pos": { "x": 71, "y": 908 }, "frames": 6 }],
                "oldsmoker": [{ "pos": { "x": 88, "y": 901 }, "frames": 6 }],
                "debate": [{ "pos": { "x": 259, "y": 801 }, "frames": 12 }],
                "cop": [{ "pos": { "x": 382, "y": 840 }, "frames": 1, "timeinter": [10, 20] }, { "frames": 6, "endcall": true }],
                "childa": [{ "pos": { "x": 357, "y": 856 }, "frames": 6 }],
                "walkman_1": [
                    { "scalex": 1, "framekey": 0, "pos": { "x": -13, "y": 984 }, "pos2": { "x": 321, "y": 840 }, "frames": 6, "movetime": 27 },
                    { "scalex": -1, "framekey": 0, "pos": { "x": 321 + 26, "y": 840 }, "pos2": { "x": 291 + 26, "y": 817 }, "frames": 6, "movetime": 5 },
                    { "scalex": 1, "framekey": 0, "pos": { "x": 291, "y": 817 }, "pos2": { "x": 338, "y": 780 }, "frames": 6, "movetime": 9 },
                    { "wait": 99 },
                ],
                "walkman_2": [
                    { "scalex": 1, "framekey": 0, "pos": { "x": 201, "y": 973 }, "pos2": { "x": 598, "y": 753 }, "frames": 6, "movetime": 32 },
                    { "scalex": -1, "framekey": 0, "pos": { "x": 598 + 26, "y": 753 }, "pos2": { "x": 467 + 26, "y": 701 }, "frames": 6, "movetime": 14 },
                    { "wait": 99 },
                ],
                "rainman_1": [
                    { "scalex": 1, "framekey": 0, "pos": { "x": -13, "y": 984 }, "pos2": { "x": 321, "y": 840 }, "frames": 6, "movetime": 27 },
                    { "scalex": -1, "framekey": 0, "pos": { "x": 321 + 31, "y": 840 }, "pos2": { "x": 291 + 31, "y": 817 }, "frames": 6, "movetime": 5 },
                    { "scalex": 1, "framekey": 0, "pos": { "x": 291, "y": 817 }, "pos2": { "x": 338, "y": 780 }, "frames": 6, "movetime": 9 },
                    { "wait": 99 },
                ],
                "rainman_2": [
                    { "scalex": 1, "framekey": 0, "pos": { "x": 201, "y": 973 }, "pos2": { "x": 598, "y": 753 }, "frames": 6, "movetime": 32 },
                    { "scalex": -1, "framekey": 0, "pos": { "x": 598 + 31, "y": 753 }, "pos2": { "x": 467 + 31, "y": 701 }, "frames": 6, "movetime": 14 },
                    { "wait": 99 },
                ],
            },
        };
        var showCfg = {
            "202": {
                "s1": ["walkman", "woman", "stevedore", "cop", "guarder_1", "guarder_2", "cruise_1", "cruise_2"],
                "s2": ["walkman", "woman", "childa", "stevedore", "debate", "cop", "oldsmoker", "oldman", "guarder_1", "guarder_2", "cruise_1", "cruise_2", "blueman", "master"],
                "s3": ["walkman", "stevedore", "debate", "oldman", "cruise_1", "cruise_2"],
                "s4": ["dageng", "cruise_1", "cruise_2"],
            },
            "203": {
                "s1": ["oldsmoker", "cop", "walkman", "childa"],
            },
            "204": {
                "s1": ["oldman", "dageng_1", "dageng_2", "debate"],
            },
            "303": {
                "s1": ["oldsmoker", "oldman", "cop", "walkman_1", "walkman_2", "childa"],
                "s2": ["rainman_1", "rainman_2"],
            },
        };
        var boneCfg = {
            "105": {
                "s1": "scene_bone_105",
            },
            "106": {
                "s1": "scene_bone_106",
            },
            "203": {
                "s1": "scene_bone_203",
            },
            "303": {
                "s1": "scene_bone_303_1",
            },
        };
        var commonCfg = {
            "102": {
                mainui_light: {
                    num: 3,
                    1: { x: 46, y: 312, scale: 1.5 },
                    2: { x: 486, y: 312, scale: 1.5 },
                    3: { x: 154, y: 597, scale: 1.5 },
                },
                mainmaplamp: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    1: { x: 344, y: 658, scale: 1 }
                }
            },
            "103": {
                mainui_light: {
                    num: 5,
                    1: { x: 246, y: 449, scale: 1 },
                    2: { x: 355, y: 449, scale: 1 },
                    3: { x: 473, y: 449, scale: 1 },
                    4: { x: 225, y: 529, scale: 1 },
                    5: { x: 496, y: 529, scale: 1 },
                },
                mainmaplamp: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    1: { x: 20, y: 735, scale: 1 }
                }
            },
            "101": {
                mainui_light: {
                    num: 4,
                    1: { x: 46, y: 530, scale: 1 },
                    2: { x: 93, y: 524, scale: 1 },
                    3: { x: 225, y: 529, scale: 1 },
                    4: { x: 496, y: 529, scale: 1 },
                },
                mainmaplamp: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    1: { x: 20, y: 735, scale: 1 }
                }
            },
            "301": {
                attic301_ef: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    isAdd: true,
                    1: { x: 216, y: 245, scale: 1 }
                }
            },
            "302": {
                attic302_ef: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    isAdd: true,
                    1: { x: 216, y: 245, scale: 1 }
                }
            },
            "303": {
                attic303_ef: {
                    num: 1,
                    frameNum: 12,
                    frameTime: 100,
                    isAdd: true,
                    1: { x: 14, y: 320, scale: 1 }
                }
            },
        };
        function getEffectCfg(key, sceneId) {
            return effectCfg[sceneId][key];
        }
        SceneeffectCfg.getEffectCfg = getEffectCfg;
        function getShowCfg(key, sceneId) {
            if (!showCfg[sceneId]) {
                return [];
            }
            return showCfg[sceneId]["s" + key];
        }
        SceneeffectCfg.getShowCfg = getShowCfg;
        function getCommonCfg(sceneId) {
            if (!commonCfg[sceneId]) {
                return null;
            }
            return commonCfg[sceneId];
        }
        SceneeffectCfg.getCommonCfg = getCommonCfg;
        function hasSceneEffect(sceneId) {
            return showCfg[sceneId] || boneCfg[sceneId]; //
        }
        SceneeffectCfg.hasSceneEffect = hasSceneEffect;
        function hasCommonEff(sceneId) {
            var cfg = {
                kr: {},
                th: { 102: 1, 103: 1 },
                ru: {},
            };
            var spid = PlatformManager.getSpid();
            if (cfg[spid]) {
                if (cfg[spid][sceneId]) {
                    return true; //
                }
            }
            else {
                return commonCfg[sceneId]; //
            }
            return false; //
        }
        SceneeffectCfg.hasCommonEff = hasCommonEff;
        function hasSceneBone(key, sceneId) {
            return boneCfg[sceneId] && boneCfg[sceneId]["s" + key];
        }
        SceneeffectCfg.hasSceneBone = hasSceneBone;
        function getBoneCfg(key, sceneId) {
            return boneCfg[sceneId]["s" + key];
        }
        SceneeffectCfg.getBoneCfg = getBoneCfg;
    })(SceneeffectCfg = Config.SceneeffectCfg || (Config.SceneeffectCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SceneeffectCfg.js.map