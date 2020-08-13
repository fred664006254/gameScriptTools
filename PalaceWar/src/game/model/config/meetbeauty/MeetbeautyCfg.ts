namespace Config {
    export namespace MeetbeautyCfg {
        /**重置时间 */
        let resetDay: number = 0;
        /**佳人id数组 */
        let wifeIdList: string[] = [];
        /**佳人needpower数组 */
        let wifeNeedPowerList: number[] = [];
        /**
         * 初始化数据
         */
        export function formatData(data: any): void {
            let tempList = []
            for (let key in data) {
                if (key == "reset") {
                    resetDay = data[key];
                } else {
                    tempList.push(data[key]);
                    // wifeIdList.push(data[key].wifeId);
                    // wifeNeedPowerList.push(data[key].needPower);
                }
            }
            tempList.sort((a, b) => {
                return a.needPower - b.needPower;
            })
            for (let i = 0; i < tempList.length; i++) {
                wifeIdList.push(tempList[i].wifeId);
                wifeNeedPowerList.push(tempList[i].needPower);
            }
        }

        export function getResetDay(): number {
            return resetDay;
        }
        export function getWifeIdList(): string[] {
            return wifeIdList;
        }
        export function getNeedPowerList(): number[] {
            return wifeNeedPowerList;
        }
        //获取当前权势在结识佳人的第几步
        export function getNowPowerStep(): number {
            let nowPower =  Api.playerVoApi.getPlayerPower();
            let powerIdx = 0;
            for (let i = 0; i < wifeNeedPowerList.length; i++) {
                if(nowPower>wifeNeedPowerList[i]){
                    powerIdx++;
                }
            }
            return powerIdx;
        }


    }
}