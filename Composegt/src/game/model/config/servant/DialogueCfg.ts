namespace Config
{
    export namespace DialogueCfg
    {
        let dialogueListCfg:Object ={};
        export function formatData(data: any): void
        {
            for (var key in data)
            {
                if(!dialogueListCfg.hasOwnProperty(String(key)))
                {
                    dialogueListCfg[String(key)] = new DialogueItemCfg();
                }
              
                dialogueListCfg[String(key)].initData(data[key]);
                dialogueListCfg[String(key)].id = String(key);
            }
        }
        export function getDialogueItemById(id:string|number):DialogueItemCfg
        {
            return dialogueListCfg[String(id)];
        }
    }
    class DialogueItemCfg extends BaseItemCfg
    {
        //对话id
        public id: string;

        //形象编号  0:无形象  1:自己  2:门客或红颜
        public icon: string;

        //背景  1:府邸  2:寻访
        public background: string;

        //1:门客  2:红颜   需要设置
        public targetType: string;
        //门客或者红颜的id  需要设置
        public targetId: string;

        public constructor()
        {
            super();
        }
        
        public get nameStr(): string
        {
            switch(this.icon)
            {
                case "0":
                    return null;
                    
                case "1":
                    return LanguageManager.getlocal("dialogueNameYou");                 
                case "2":
                    if (this.targetType == "1"){
                        // let servantCfg = GameConfig.config.servantCfg[this.id];
                        let servantCfg = Config.ServantCfg.getServantItemById(this.targetId);
                        return servantCfg.name;
                    } else if (this.targetType == "2")
                    {
                        let wifeCfg = Config.WifeCfg.getWifeCfgById(this.targetId);
                        return wifeCfg.name;
                    } else {
                        return null;
                    }
                default:

                    return null;

            }

        }
        public get fullIconStr(): string
        {
            switch(this.icon)
            {
                case "0":
                    return null;
                    
                case "1":
                   
                    return "user_body" + Api.playerVoApi.getPlayerLevel()                 
                case "2":
                    if (this.targetType == "1"){
                        // let servantCfg = GameConfig.config.servantCfg[this.id];
                        let servantCfg = Config.ServantCfg.getServantItemById(this.targetId);
                        return servantCfg.fullIcon;
                    } else if (this.targetType == "2")
                    {
                        let wifeCfg = Config.WifeCfg.getWifeCfgById(this.targetId);

                        return wifeCfg.body;
                    } else {
                        return null;
                    }
                default:

                    return null;

            }
        }


        public get bgName(): string
        {
            if (this.background == "1")
            {
                return "homescene";
            } 
            else if(this.background == "2")
            {
                return "searchbg1";
            } 
            else 
            {
                return "homescene";
            }
        
        }
        public get dialogStr(): string
        {
            return LanguageManager.getlocal("substitution" + this.id);
        }
        

    }

}

