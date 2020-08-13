namespace Config{
	export namespace TitleupgradeCfg{
        //--王位排序。
        export let wangOrder = [];
        //--王位升级系统
        export let wangList = [];
        //--帝位排序。
        export let diOrder=[];
        //--帝位升级系统
        export let diList = [];
        //--皇位排序。
        export let huangOrder=[];
        //--皇位升级系统
        export let huangList = [];
        export function formatData(data:any):void{
			for(let key in data){
				this[key] = data[key];
            }
        }
        
        export function getWangOrder():any[]{
            let titlecfg = Config.TitleCfg.getTitleCfg();
            let special = 3201;
            for(let i in titlecfg){
                let cfg : TitleItemCfg = titlecfg[i];
                if(cfg.isTitle == 1 && cfg.titleType == 2 && this.wangOrder.indexOf(Number(cfg.id)) == -1){
                    this.wangOrder.push(Number(cfg.id));
                }
            }
            let idx = this.wangOrder.indexOf(special);
            let mid = 0;//Math.floor(this.wangOrder.length / 2)
            let tmp = this.wangOrder[mid];
            this.wangOrder[mid] = this.wangOrder[idx];
            this.wangOrder[idx] = tmp;
            return this.wangOrder;
        }

        export function getDiOrder():any[]{
            let titlecfg = Config.TitleCfg.getTitleCfg();
            //千古一帝居中
            let special = 3101;
            for(let i in titlecfg){
                let cfg : TitleItemCfg = titlecfg[i];
                if(cfg.id != `3201` && cfg.isTitle == 1 && cfg.titleType == 1 && this.diOrder.indexOf(Number(cfg.id)) == -1){
                    this.diOrder.push(Number(cfg.id));
                }
            }
            let idx = this.diOrder.indexOf(special);
            let mid = 0;//Math.floor(this.diOrder.length / 2)
            let tmp = this.diOrder[mid];
            this.diOrder[mid] = this.diOrder[idx];
            this.diOrder[idx] = tmp;
            return this.diOrder;
        }

        export function getHuangOrder():any[]{
            let titlecfg = Config.TitleCfg.getTitleCfg();
            //昭烈皇居中 崇德皇左边、玄明皇右边
            let special = 3151;
            for(let i in titlecfg){
                let cfg : TitleItemCfg = titlecfg[i];
                if(cfg.id != `3201` && cfg.isTitle == 1 && cfg.titleType == 7 && this.huangOrder.indexOf(Number(cfg.id)) == -1){
                    this.huangOrder.push(Number(cfg.id));
                }
            }
            let idx = this.huangOrder.indexOf(special);
            let mid = 0;//Math.floor(this.diOrder.length / 2)
            let tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;

            special = 3153;
            idx = this.huangOrder.indexOf(special);
            mid = 1;//Math.floor(this.diOrder.length / 2)
            tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;

            special = 3152;
            idx = this.huangOrder.indexOf(special);
            mid = 2;//Math.floor(this.diOrder.length / 2)
            tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;
            return this.huangOrder;
        }
    }
}