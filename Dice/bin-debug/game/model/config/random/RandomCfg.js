var Config;
(function (Config) {
    var RandomCfg;
    (function (RandomCfg) {
        //--对战：新手玩家前 X 场必为机器人
        var battleRandom1 = 0;
        //--对战：新手玩家前 X 场机器人难度   1：初级  2：中级  3：高级
        var battleRandom1Order = [];
        //--协同：新手玩家前 X 场必为机器人
        var battleRandom2 = 0;
        //--协同：新手玩家前 X 场机器人难度   1：初级  2：中级  3：高级
        var battleRandom2Order = [];
        function formatData(data) {
            battleRandom1 = data.battleRandom1;
            battleRandom1Order = data.battleRandom1Order;
            battleRandom2 = data.battleRandom2;
            battleRandom2Order = data.battleRandom2Order;
        }
        RandomCfg.formatData = formatData;
        // export function getNewMaxRobot(isPVP : boolean):number{
        //     return isPVP ? battleRandom1 : battleRandom2;
        // }
        // export function getRobotStrategy(num : number):number{
        //     return battleRandom1Order[num - 1];
        // }
        // export function getNewMaxRobot():number{
        //     return battleRandom1;
        // }
        // export function getRobotStrategy(num : number):number{
        //     return battleRandom1Order[num - 1];
        // }
    })(RandomCfg = Config.RandomCfg || (Config.RandomCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RandomCfg.js.map