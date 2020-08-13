namespace Config {
    export namespace ZerogiftCfg {
        let zeroGiftCfg: Object = {};
        export function formatData(data: any): void {
            zeroGiftCfg = data;
        }
        /**通过页签id获取对应奖励列表 */
        export function getList(id): string {
            return zeroGiftCfg['giftList'][id]["getReward"];
        }
        /**通过页签id获取对应骨骼id */
        export function getBonesById(id): string {
            return zeroGiftCfg[`giftShow_${id}`];
        }
    }
}