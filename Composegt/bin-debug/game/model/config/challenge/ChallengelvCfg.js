var Config;
(function (Config) {
    var ChallengelvCfg;
    (function (ChallengelvCfg) {
        function getAddPersonLvByChallengeId(id) {
            var cfg = GameConfig.config.challengelvCfg;
            if (cfg && Object.keys(cfg).length) {
                var addPersonLv = 0;
                for (var key in cfg) {
                    if (cfg.hasOwnProperty(key)) {
                        if (Number(id) >= Number(key)) {
                            var element = cfg[key];
                            if (element.addPersonLv >= addPersonLv) {
                                addPersonLv = element.addPersonLv;
                            }
                        }
                    }
                }
                return addPersonLv;
            }
            return 0;
        }
        ChallengelvCfg.getAddPersonLvByChallengeId = getAddPersonLvByChallengeId;
        function getNextAddChallengeId(hasPassId) {
            var cfg = GameConfig.config.challengelvCfg;
            if (cfg && Object.keys(cfg).length) {
                var nextChallengeId = 0;
                for (var key in cfg) {
                    if (cfg.hasOwnProperty(key)) {
                        if (Number(key) > Number(hasPassId)) {
                            if (!nextChallengeId) {
                                nextChallengeId = Number(key);
                            }
                            if (Number(key) <= nextChallengeId) {
                                nextChallengeId = Number(key);
                            }
                        }
                    }
                }
                return nextChallengeId;
            }
            return 0;
        }
        ChallengelvCfg.getNextAddChallengeId = getNextAddChallengeId;
    })(ChallengelvCfg = Config.ChallengelvCfg || (Config.ChallengelvCfg = {}));
})(Config || (Config = {}));
