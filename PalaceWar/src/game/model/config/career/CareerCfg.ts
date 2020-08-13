namespace Config {

	/**
	 * 仕途配置
	 */
	export namespace CareerCfg
	{	
        let story:number;

        export function formatData(data:any):void
		{
            story = data.story;
        }

        export function getStoryNeedLv():number
        {
            return story;
        }
    }


}