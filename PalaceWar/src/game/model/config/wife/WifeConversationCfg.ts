namespace Config
{
	/**
	 * 皮肤配置
	 */
	export namespace WifeconversationCfg 
	{
        /**--role:对话方。1：我。2：对方。无：旁白
        --choice:选项
        --next:跳转至几号剧情
        --getReward:奖励*/
        export let conversation1 : string = ``;        
		export function formatData(data:any):void
		{
			this.conversation1 = data.conversation1;
        }

        export function getConversatiById(id : string){
            return this.conversation1[id];
        }
    }
}