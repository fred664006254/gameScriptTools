namespace Api
{
    export namespace SigninfoVoApi
    {
        let signinfoVo:SignInfoVo;
        export function formatData(data:any):void
		{
            if(!signinfoVo)
            {
                signinfoVo=new SignInfoVo();
            }
            signinfoVo.initData(data);
        }

        /**
         * 获取改名次数
         */
        export function getRenameNum():number{
            let num = 0;
            if(signinfoVo && signinfoVo.renameNum){
                num = signinfoVo.renameNum;
            }
            return num;
        }
        export function getReWordData():string{
            let signDay = parseInt(String(signinfoVo.days%7));
            if(signDay == 0){
                signDay = 7;
            }
            if(this.getSignWeek()){
                return Config.SignCfg.getSignInfoByID(String(signDay+7));
            }else{
                return Config.SignCfg.getSignInfoByID(String(signDay));
            }
        }
        //展示七日奖励
        export function getShowWordData():string{
            if(this.getSignWeek()){
                return Config.SignCfg.getSignInfoByID(String(14));
            }else{
                return Config.SignCfg.getSignInfoByID(String(7));
            }
        }

        //判断签到是否过一周
        export function getSignWeek():boolean
        {
            if(signinfoVo){
                if(signinfoVo.days == 7&&signinfoVo.hasSign == 0){
                    return true;
                }
                if(signinfoVo.days>7)
                {
                    return true;
                }
            }
            return false;
        }
        //判断是否是第七天
        export function isSignWeek():boolean
        {
            if(signinfoVo){
                if(parseInt(String(signinfoVo.days%7))==6)
                {
                    return true;
                }
            }
            return false;
        }
        //判断是否已签到
        export function getSignCom(days:number):boolean{
            let signCom = getSignDay();
            let signDay = parseInt(String(days%7));
            if(signCom+1==signDay&&signinfoVo.hasSign == 0){
                return true;
            }else{
                return false;
            }

        }
        //判断是否是签到日
        export function getSign(days:number):boolean{
            let signCom = getSignDay();
            let signDay = parseInt(String(days%7));
            if(signCom==0&&signinfoVo.hasSign == 1){
                return true;
            }
            if(signCom>=signDay){
                return true;
            }else{
                return false;
            }

        }
        export function getSignSeven():boolean{
            let signCom = getSignDay();
            if(signCom==0&&signinfoVo.hasSign == 1){
                return true;
            }else{
                return  false;
            }
        }
        export function getSignDay():number{
            if(signinfoVo){
                let signDay = parseInt(String(signinfoVo.days%7));
                return signDay;
            }
            return null;
        }   
        export function getSignData():Array<string>{
            if(this.getSignWeek()){
                return Config.SignCfg.getSgnLoopIDs();
            }else{
                return Config.SignCfg.getSgnIDs();
            }
        }  
        export function getSignInfoByID(id:string):string{
            return  Config.SignCfg.getSignInfoByID(id);
        }
        

        export function gethasSign():boolean
        {
            console.log(signinfoVo.hasSign);
            if(signinfoVo&&Number(signinfoVo.hasSign) == 0){
                return false;
            }else{
                return true;
            }
        }
        //icon是否可点击
        export function getSignTou(day:number):boolean
        {
            let signCom = getSignDay();
            let signDay = parseInt(String(day%7));
            if(Number(signinfoVo.hasSign) == 0){
                if(signCom+1<signDay){
                    return true;
                }else{
                    return false;
                }
            }else{
                if(signDay == 0){
                    return false;
                }
                if(signCom<signDay){
                    return true;
                }else{
                    return false;
                }
            }
            
        }
        //获取红点信息
        export function getSignHsa():boolean{
            if(signinfoVo){
                if(signinfoVo.hasSign == 0){
                    return true;
                }else{
                    return false;
                }
                 
            }
        }

        /**
         * 获取首冲状态
         * 0 未首冲;
         * 1 已首冲，未领奖;
         * 2 已首冲，已领奖;
         */
        export function isFirstRecharge(): number {
            return signinfoVo? signinfoVo.payFlag : 0;
        }
        
        //是否展示金币
        export function getShowBool(type:number):boolean
        {
            if(type == 1||type == 2){
                return true;
            }else{
                return false;
            }
        }

    }
}