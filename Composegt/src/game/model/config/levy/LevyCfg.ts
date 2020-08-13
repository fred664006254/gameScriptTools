namespace Config {
    export namespace LevyCfg {
        let progress:any = null;
        let personProgress:any = null;
        //buff列表
        export let buff: {[index:number]:LevyBuffItem} = null;
        //buff详细内容
        export let levybuff: {[index:number]:LevyLevybuffItem} = null;

        export let LevyItemList:any[] = []
        //解析数据
        export function formatData(data: any): void {
            LevyItemList=[]
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }

            let _personProgress = this.personProgress;
            LevyItemList.push(_personProgress);   

            let _progress = this.progress;
            let max = Object.keys(_progress).length;
            for (let i = 1; i <= max; i++) {
                LevyItemList.push(_progress[i]);    
            }
                
            
        }

        export function getBuffInfoCfg(buffId: string): {attType:number,resType:number,rate:number} { 
            return this.levybuff[buffId] || {}; 
        }
    }
    
    /**
     * buff的触发条件和效果
     */
    class LevyBuffItem extends BaseItemCfg {
        /**
         * BUFF触发条件数量
         * 类型为3时，[品质要求, 数量要求]
         */
        public condNum: number | number[];
        /**
         * 类型
         * 1总等级 2总资质 3品质
         */
        public condType: number;
        /**
         * BUFF的ID
         */
        public levyBuffID: string[];
    }

    /**
     * 征收BUFF信息配置
     */
    class LevyLevybuffItem extends BaseItemCfg {
        /**属性类型:1武 2智 3政 4魅 */
        public attType: number;
        /**产出资源类型:1银两 2粮草 3士兵 */
        public resType: number;
        /**产出效果比例：对应属性*效果比例 */
        public rate: number;
    }


}