namespace Config {
    /**
     * 自定义头像配置类
     * author zhaozhantao
     * date 2019/7/31
     * @namespace PortraitCfg
     */

    export namespace PortraitCfg {
        let portraitList: Object = {};
        export function formatData(data: any): void {
            for (var key in data) {
                let portraitCfg: PortraitItemCfg;
                if (!portraitList.hasOwnProperty(String(key))) {
                    portraitList[String(key)] = new PortraitItemCfg();
                }
                portraitCfg = portraitList[String(key)];
                portraitCfg.initData(data[key]);
                portraitCfg.id = String(key);
            }
        }
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        export function getPortraitCfgById(id: number|string): PortraitItemCfg {
            return portraitList[String(id)];
        }

         export function getPortraitCfg(): Object {
            return portraitList;
        }

		export function getPortraitIdList()
		{
			return Object.keys(portraitList);
		}
    }

    export class PortraitItemCfg extends BaseItemCfg {
		/**
		 * 道具id
		 */
		public id: string;
		/**
		 * 类型  1：道具 2：合成 3：时装
		 */
		public type: number;
		/**
		 * 分组  1委任状，2称号，3头像框，4头像
		 */
		public group: number = 4;
		/**
		 * 品质
		 */
		public quality: number;
		/**
		 * 排序
		 */
		public sortId: number;
		
		/**
		 * 道具名称
		 */
		public get qualityColor():number
		{
			let color:number=TextFieldConst.COLOR_QUALITY_WHITE_NEW;
			switch(Number(this.quality))
			{

				case 1:
					color=TextFieldConst.COLOR_QUALITY_WHITE_NEW;
					break;
				case 2:
					color=TextFieldConst.COLOR_QUALITY_GREEN_NEW;
					break;
				case 3:
					color=TextFieldConst.COLOR_QUALITY_BLUE_NEW;
					break;
				case 4:
					color=TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
					break;
				case 5:
					color=TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
					break;
				case 6:
					color=TextFieldConst.COLOR_QUALITY_RED_NEW;
					break;
				case 7:
					color=TextFieldConst.COLOR_QUALITY_YELLOW_NEW;					
					break;
				case 8:
					color=TextFieldConst.COLOR_QUALITY_GOLD_NEW;					
					break;
			}
			return color;
		}
		public get name():string 
		{
			return LanguageManager.getlocal("itemName_" + this.id);		}
		
		/**
		 * 道具图片
		 */
		public get icon():string 
		{
			return "user_head" + this.id;
		}
		/**
		 * 道具图片背景
		 */
		public get iconBg():string 
		{
			return "itembg_" + (this.quality?this.quality:1);
		}
		// 道具描述
		public get desc():string
		{
			return LanguageManager.getlocal("itemDesc_" + this.id);
		}
		// 道具描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("itemDropDesc_" + this.id);
		}
	}
}