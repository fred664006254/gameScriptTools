namespace Config {
    export namespace FirstrechargeCfg {
        // 首冲奖励
        let firstRechargeReward = "";
        export function formatData(data: any) {
            // console.log('first rec init', data)
            firstRechargeReward = data.firstReward || "";
        }
        /**
         * 获取首冲奖励信息
         */
        export function getFirstRecReward() {
            return firstRechargeReward;
        }
    }
}