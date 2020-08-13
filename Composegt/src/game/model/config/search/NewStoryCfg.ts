/**
 * 配置
 */
namespace Config
{
	/**
	 *     --剧情
	 */
	export namespace NewstoryCfg
	{
        let storyMap:{[key:string]:StoryItemCfg} = {};

		export function formatData(data:any):void
		{
			if(typeof(data) == "object"){
				formatStory(data);
			}	
			// for(var key in data)
			// {



			// 	if(typeof(data[key])=="object")
			// 	{
			// 		if(key=="story")
			// 		{
			// 			formatStory(data[key]);
			// 		}

			// 	}
			// 	else
			// 	{
			// 		NewstoryCfg[key]=data[key];
			// 	}
			// }
		}

		function formatStory(data:any):void
		{
			for(var key in data)
			{
				let storyCfg:StoryItemCfg=new StoryItemCfg();
				storyCfg.initData(data[key]);
				storyCfg.id=String(key);
                
				storyMap[key]=storyCfg;
			}
		}
        export function getStoryItemCfgById(storyId:string):StoryItemCfg
        {
            return storyMap[storyId];
        }

	}
	export class StoryItemCfg extends BaseItemCfg
	{
        public id :string;
        //起始id
        public startId:string;
        
        public dialogMap:{[key:string]:DialogItemCfg} = {};

        public initData(data:any):void
        {
            if(data)
            {
                for(var key in data)
                {
                    let dialogCfg:DialogItemCfg = new DialogItemCfg();
                    dialogCfg.initData(data[key]);
                    dialogCfg.id = String(key);
                    if(this.startId == null && dialogCfg.begin == 1){
                        this.startId = dialogCfg.id;
                    }
                    this.dialogMap[key] = dialogCfg;
                }
            }
        }
        public getDialogItemCfgById(dialog:string):DialogItemCfg
        {
            return this.dialogMap[dialog];
        }
		public constructor() 
		{
			super()
		}
	}
	export class DialogItemCfg extends BaseItemCfg
	{
        public id :string;
        /**
         * 起始点
         */
        public begin:number;
		/**
		 * 角色ID
		 */
		public personPic:string;


        public personName:string;
		/**
		 * 角色位置
		 */
		public personPosition:number;
        /**
         * 背景图ID
         */
        public backGroundID:string;

		/**
		 * 对话类型（0：普通对话；1，选项）
		 */
		public dialogueType:number;

		/**
		 * 对话内容
		 */
        public dialogueID:number;

		/**
		 * 后继对话（-1是结束）
		 */
		public dialogueNext:number;
        /**
         * 对话选项
         */
        public dialogueOption:string;

		public constructor() 
		{
			super()
		}
	}

}