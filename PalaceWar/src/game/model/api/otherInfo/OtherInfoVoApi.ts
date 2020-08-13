/**
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
class OtherInfoVoApi extends BaseVoApi
{
	private otherInfoVo:OtherInfoVo;
    // private jd618CollectFlag:boolean = true;
	public constructor() 
	{
		super();
	}

    /**
     * 检测是否已膜拜
     */
    public isRankVisited(idx:number)
    {
        if(idx == 0)
        {
            return this.otherInfoVo.power
        }
        if(idx == 1)
        {
            return this.otherInfoVo.challenge 
        }
        if(idx == 2)
        {
            return this.otherInfoVo.imacy
        }
        if(idx == 3)
        {
            return this.otherInfoVo.gpower
        }
         if(idx == 4)
        {
            return this.otherInfoVo.galliance
        }
         if(idx == 5)
        {
            return this.otherInfoVo.gbiography;
        }
    }

     public getOtherInfo()
    {
        return this.otherInfoVo;
    }

     /**
     * 检测是否领取绑定奖励
     */
    public isGetBindingReward()
    {
        if(this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1){
            return true;
        }   
        return false;
    }
    public getPalaceFlag()
    {
        return this.otherInfoVo.palace_flag;
    }
    //获取禁言剩余时间
    public getBanet()
    {
        return this.otherInfoVo.banet;
    }

    //获取禁言剩余时间
    public getCrossBanet()
    {
        return this.otherInfoVo.info.crossBanet;
    }

     //获取糖果屋领取情况
    public getCandyGetInfo()
    {
        return this.otherInfoVo.info.candy;
    }
      //疯狂游乐场关分享信息
    public getFkShareInfo()
    {
        return this.otherInfoVo.info.fkShare;
    }

      //疯狂游乐场关关注信息
    public getFkFocusInfo()
    {
        return this.otherInfoVo.info.fkFocus;
    }

     //疯狂游乐场分享红点
    public getFkIsshowRed()
    {
        if(!this.otherInfoVo.info.fkShare){
            return false;
        }
        let rewards = Config.GameprojectCfg.rewardFKYLC2;
        let keys=Object.keys(rewards);

		let l:number=keys.length;
        let fkVo = Api.otherInfoVoApi.getFkShareInfo();
		for(let i:number=0;i<l;i++)
		{
			let rewardStr=rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            let state = 1;
            if(!fkVo){
                state = 3;
            }
            else{
                if(fkVo.n >= Number(keys[i]))
                {
                    if(fkVo.get[keys[i]] == 1)
                    {
                        state = 2;
                    }
                    else{
                        state = 1;
                    }
                }
                else{
                    state = 3;
                }
            }
            if(state == 1){
                return true;
            }
		}

        return false;
    }

    public checkShowWanbaDesktopIcon():boolean
    {
        return PlatformManager.isSupportDesktopIcon()&&!this.checkWanbaHasSendDesktop();
    }

    public checkShowWanbaShareIcon():boolean
    {
        return PlatformManager.isSupportShare()&&!this.checkWanbaDailyHasShared();
    }

    public checkWanbaHasSendDesktop():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbsendFlag;
    }

    public checkWanbaDailyHasShared():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbdailyshareFlag;
    }



    // 3k实名认证已领取 true 未领取
     public checkrealnamerewards():boolean
    {
        if(this.otherInfoVo.info.author3k)
        {
            return false
        }
        return true
    }

    public getServantSortId()
    {
        let sortId = this.otherInfoVo.info.sortId;
        return sortId? sortId : 1 ;
    }

    public getWifeSortId()
    {
        let wsortId = this.otherInfoVo.info.wsortId;
        return wsortId? wsortId : 1 ;
    }

    public getUnlockList()
    {   
        if(this.otherInfoVo.info)
        {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    }
    
    //功能解锁名字
    public getFunctionName():string
    {   
        var arr2 =this.getopenArr();
        if(arr2==null)
        {
            return null;
        } 
        let str = LanguageManager.getlocal("functionModuleDes"+arr2[0].key);
        return  str;
     
    }

    //1 如果 有开关功能的功能预览  在本类getfunLength、getopenArr 这两个方法内加开关，
    //2 可参考 亲家，内阁等功能

    // 功能预览 显示列表 开关打开的， 
    public getopenArr(type:number=0):Array<any>
    {
        //领取数据  
        let arr = Api.otherInfoVoApi.getUnlockList();
		var arr2 = [];
		arr2 =  Config.UnlocklistCfg.getUnlockItemCfgList();
		var arr3 =[]; //已经领取过的
		var arr4 =[]; //可以领取的
		var arr5 =[]; //不可以领取的
		for(var i:number=0;i<arr2.length ;i++)
		{
			if(arr&&arr[arr2[i].key]==1)
			{
				arr3.push(arr2[i]);
                if(arr3.length == this.getfunLength()&&type!=1)
                {
                    return null;
                }
			}
			else
			{   
                let currentName =arr2[i].gameName;
				if(currentName=="sadun"||currentName=="council" || currentName=="servantExile"||currentName=="wifebanish")
				{
                    
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
					// 亲家
					if(Api.switchVoApi.checkopenSadun()&&arr2[i].gameName=="sadun")
					{
					    if(isShowNpc)
						{
							arr4.push(arr2[i]);
						}
						else
						{
							arr5.push(arr2[i]);
						}
					}
					// 内阁
					else if(arr2[i].gameName=="council"&&Api.switchVoApi.checkOpenCouncil())
					{
						if(isShowNpc)
						{
							arr4.push(arr2[i]);
						}
						else
						{
							arr5.push(arr2[i]);
						}
					} 
                    // 出海
					else if(arr2[i].gameName=="servantExile"&&Api.switchVoApi.checkOpenExile())
					{
						if(isShowNpc)
						{
							arr4.push(arr2[i]);
						}
						else
						{
							arr5.push(arr2[i]);
						}
					}
                    // 省亲
					else if(arr2[i].gameName=="wifebanish"&&Api.switchVoApi.checkOpenBanish())
					{
						if(isShowNpc)
						{
							arr4.push(arr2[i]);
						}
						else
						{
							arr5.push(arr2[i]);
						}
					} 

                }
                else if (currentName=="servantWeapon")
                {   
                    if (Api.switchVoApi.checkWeaponFunctionOnly())
                    {
                        let isShowNpc:boolean=Api.weaponVoApi.isShowNpc();
                        if(isShowNpc)
                        {
                            arr4.push(arr2[i]);
                        }
                        else
                        {
                            arr5.push(arr2[i]);
                        }
                    }
                }
                else if(currentName=="wifeBattle"){
                    if(Api.switchVoApi.checkOpenWifeBattle()){
                        if(Api.wifebattleVoApi.isShowNpc())
                        {
                            arr4.push(arr2[i]);
                        }
                        else
                        {
                            arr5.push(arr2[i]);
                        }
                    }
                }
                else  if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
             	{
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
				  	if(isShowNpc)
					{
						arr4.push(arr2[i]);
					}
					else
					{
						arr5.push(arr2[i]);
					}
                } 
			}
		}
	 
		arr3.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		arr4.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });

		arr5.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		
		arr2 = arr4.concat(arr5).concat(arr3); 
        return arr2;
    }
    

    //当前解锁的长度
    private getfunLength():number
    {       
        let arr = Api.otherInfoVoApi.getUnlockList();
		var arr2 = [];
		arr2 =  Config.UnlocklistCfg.getUnlockItemCfgList();
		var arr3 =[]; //已经领取过的
		var arr4 =[]; //可以领取的
		var arr5 =[]; //不可以领取的
		for(var i:number=0;i<arr2.length ;i++)
		{
			if(arr&&arr[arr2[i].key]==1)
			{
				arr3.push(arr2[i]); 
			}
			else
			{   
                let currentName =arr2[i].gameName;
				if(currentName=="sadun"||currentName=="council" || currentName=="servantExile"||currentName=="wifebanish"||currentName==`wifeBattle`)
				{ 
					// 亲家
					if(Api.switchVoApi.checkopenSadun()&&arr2[i].gameName=="sadun")
					{
						arr5.push(arr2[i]);
					}
					// 内阁
					else if(arr2[i].gameName=="council"&&Api.switchVoApi.checkOpenCouncil())
					{
						arr5.push(arr2[i]);
					} 
                    // 出海
					else if(arr2[i].gameName=="servantExile"&&Api.switchVoApi.checkOpenExile())
					{
						arr5.push(arr2[i]);
					}
                    // 省亲
					else if(arr2[i].gameName=="wifebanish"&&Api.switchVoApi.checkOpenBanish())
					{
						arr5.push(arr2[i]);
                    }
                    else if(currentName=="wifeBattle"&&Api.switchVoApi.checkOpenWifeBattle()){
                        arr5.push(arr2[i]);
                    } 
                }
                else  if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
             	{ 
                    arr4.push(arr2[i]); 
				} 
			}
		}    
		arr2 = arr4.concat(arr5).concat(arr3); 
        return arr2.length;
    }
    
    //功能解锁红点
    public getFunctionRedhot():boolean
    {
         let arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
         if(arr2==null)
         {
             return false;
         }
         if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.unlockList)
         { 
            var arr = this.otherInfoVo.info.unlockList;
            var boo:boolean =false;
            for(var i:number=0;i<arr2.length ;i++)
            {
                if(arr2[i].gameName=="wifeBattle"){
                    if(Api.switchVoApi.checkOpenWifeBattle()){
                        if(Api.wifebattleVoApi.isShowNpc()&&arr[arr2[i].key]!=1){
                            boo=true; 
                            return boo;
                        } 
                    }
                }
                else if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
                {
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
                    if(isShowNpc&&arr[arr2[i].key]!=1)
                    {
                        boo=true; 
                        return boo;
                    } 
                } 
            }
         return boo; 
      }
      else
      {
          return false;
      }
    }
    public getCoverState():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        } else {
            return 0;
        }
    }
    /** 获取港台绑定账号奖励领取状态 */
    public getFBBindFlag():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        } else {
            return 0;
        }
    }
 
    public certification():boolean
    {   
        if(this.otherInfoVo.certification)
        {
            return true;
        }
        return false;
    }

    /**
     * 是否是新用户的
     */
    public isnewuser():boolean
    {
        if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.isnewuser)
        {
            return true;
        }
        return false;
    }

    public isJD618RewardEnable()
    {
        if(this.isJDActiveIconVisible())
        {
            let jd618 = this.otherInfoVo.jd618;
            if(jd618 && jd618.flag == 0  )
            {
                return true;
            }
        }
        return false;
    }
 
    public isJDActiveIconVisible()
    {
        let jd618 = this.otherInfoVo.jd618;
        if(jd618 && jd618.st <= GameData.serverTime && jd618.et >= GameData.serverTime)
        {
            return true;
        }
        return false;
    }
    public getJD618ActivetyTimeStr():string
    {
        if(this.isJDActiveIconVisible()){
            let lt = this.otherInfoVo.jd618.et ;
            if(lt - GameData.serverTime <= 86400*2){
                return App.DateUtil.getFormatBySecond(lt - GameData.serverTime,5);
            }
        }
		return "";
    }
    /**
     * 获取分享奖励的领取次数
     */
    public getShareGuideCount():number
    {
        let count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.shareguide) 
        {
            return this.otherInfoVo.info.shareguide;
        }
        return count;
    }
    /**
     * 新分享面板的信息
     */
    public getGeneralShareInfo():any
    {
        return this.otherInfoVo.info.generalshare;
    }

     /**
     * 玩吧回归礼包
     */
    public getReturnrewardWB6():any
    {
        return this.otherInfoVo.info.returnrewardWB6;
        // return 1;
    }

    public checkWanbaEGameHasReward():boolean
    {
        return this.otherInfoVo.info && this.otherInfoVo.info.qqes && this.otherInfoVo.info.qqes.rflag;
    }

    public isEmpireOnlineNotice()
    {
        return  this.otherInfoVo.banEmMsg != 1;
    }

    public getCurSceneId(sceneName:string = "homeScene"):string
    {   
        if (!this.otherInfoVo)
        {
            return "";
        }
        if (sceneName == "homeScene")
        {
            return this.otherInfoVo.skinWared ? String(this.otherInfoVo.skinWared) : "101";
        }
        else if (sceneName == "cityScene")
        {   
            // return "202";
            return this.otherInfoVo.skinWared2 ? String(this.otherInfoVo.skinWared2) : "201";
        }
        else
        {
            return this.otherInfoVo.skinWared3 ? String(this.otherInfoVo.skinWared3) : "301";
        }
    }

    public setCurSceneId(s:string,sceneName:string = "homeScene"):void
    {   
        if (sceneName == "homeScene")
        {
             this.otherInfoVo.skinWared = s;
        }
        else if (sceneName == "cityScene")
        {
             this.otherInfoVo.skinWared2 = s;
        }
        else
        {
             this.otherInfoVo.skinWared3 = s;
        }
       
    }

    public getSceneResName(sceneName:string = "homeScene",sceneId?:string):string
    {   
        if (!this.otherInfoVo)
        {
            return "";
        }

        let sid = this.getCurSceneId(sceneName);
        if (sceneId)
        {
            sid = sceneId;
        }
        sceneName=sceneName.toLowerCase();
        let resName:string = sceneName+"_"+sid;

        if (sid == "202")
        {
            resName += "_"+ this.getCitySceneType();
        }
        else if (sid == "303")
        {   
            let stype = GameData.serverTime % 100 >= 50 ? "2" : "2";
            resName += ("_"+stype);
        }


        if (!RES.hasRes(resName))
        {
            resName = sceneName;
            if (sceneName == "searchscene")
            {
               resName= "searchbg1";
            }
        }
        return resName;
    }

    public getCitySceneType():string
    {
        let key = LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME+Api.playerVoApi.getPlayerID());
        if (key == "" || key == "0")
        {
            return String(GameData.getTimeIsnterval());
        }
        else
        {
            return key;
        }
    }
    /**
     * 本身是否拥有这个场景，不关心 他有没有解锁
     */
    public isHasSceneNotAboutUnlock(id: string, sceneName: string = "homeScene"): boolean {
        if (id == "101") {
            return true;
        }
        let hadSkins: any;
        if (sceneName == "homeScene") {
            hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene") {
            hadSkins = this.otherInfoVo.skinHad2;
        }
        else {
            hadSkins = this.otherInfoVo.skinHad3;
        }

        if (hadSkins && hadSkins[id]) {
            return true
        }
        return false;
    }

    public isHasScene(id:string,sceneName:string = "homeScene"):boolean
    {   
        if (id == "101")
        {
            return true;
        }
        let hadSkins:any;
        if (sceneName == "homeScene")
        {
             hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene")
        {
             hadSkins = this.otherInfoVo.skinHad2;
        }
        else
        {
             hadSkins = this.otherInfoVo.skinHad3;
        }

        if (hadSkins)
        {   
            let allId:string[] = Object.keys(hadSkins)
            for (let k in allId)
            {   
                let key = allId[k];
                if (key == id && hadSkins[key]==1)
                {
                    return true;
                }
            }
        }
        return false;
    }

    public isHasSceneUnlock(id:string,sceneName:string):boolean
    {   
        let hadSkins:any;
        if (sceneName == "homeScene")
        {
             hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene")
        {
             hadSkins = this.otherInfoVo.skinHad2;
        }
        else
        {
             hadSkins = this.otherInfoVo.skinHad3;
        }

        if (hadSkins)
        {   
            let allId:string[] = Object.keys(hadSkins)
            for (let k in allId)
            {   
                let key = allId[k];
                if (key == id && hadSkins[key]==2)
                {
                    return true;
                }
            }
        }
        return false;
    }

    public isHasSceneRedot():boolean
    {   
        let allScene:string[] = Config.SceneCfg.getAllScene();
        for (let h:number=0; h<allScene.length; h++)
        {
            let allKeys:string[] = Config.SceneCfg.getSceneAllId(allScene[h]);
            for (let i:number=0; i<allKeys.length; i++)
            {
                if (!Api.otherInfoVoApi.isHasScene(allKeys[i]))
                {
                    let abilitycfg = Config.SceneCfg.getSceneCfgBySceneName(allScene[h],allKeys[i]).personalityCfg;
                    if (abilitycfg && abilitycfg.unlock && abilitycfg.unlock<=Api.playerVoApi.getPlayerLevel())
                    {
                        return true;
                    }
                    else if (abilitycfg && abilitycfg.activityUnlock && Api.otherInfoVoApi.isHasSceneUnlock(allKeys[i],allScene[h]))
                    {
                        return true;
                    }
                }
            }
        }


        return false;
    }

    public isSceneCanScroll(sceneName):boolean
    {
        return Config.SceneCfg.getIsSceneScroll(this.getCurSceneId(sceneName));
    }

    /**
	 * 检测玩吧双11icon是否显示
	 */
	public checkOpenWB11Icon():boolean
	{
		return GameData.serverTime>=1541692800&&GameData.serverTime<1541951999;
	}

    public checkShowAcitivePop():boolean
	{
		return (this.otherInfoVo.setactivitypop != 1);
    }
    /**
     * 获取本服开服时间 
     * */
    public getServerOpenDay():number{
        let num = 0;
        if(this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.opendate){
            num = Math.ceil((GameData.serverTime - this.otherInfoVo.info.opendate) / 86400);
        }
        return num;
    }

    public checkUserMsg():boolean
    {
        if (Object.keys(this.otherInfoVo.userMsg).length>0)
        {
            return true;
        }
        return false;
    }

    public getPushInfo():any
	{
        return this.otherInfoVo.pushInfo;
    }

    public getOpenHideVip():boolean{
        let flag = false;
        if(this.otherInfoVo.info && this.otherInfoVo.info.hideVip){
            flag = true;
        }
        return flag;            
    }

    public getDangjiaNpc():string{
        let str = ``;
        if(this.otherInfoVo.info && this.otherInfoVo.info.dangjia && Number(this.otherInfoVo.info.dangjia) != 101){
            str = this.otherInfoVo.info.dangjia+"";
        }
        return str;            
    }

    public getDangjiaWifeId():string{
        let str = this.getDangjiaNpc();
        let strArray:string[] = str.split("_");
        return strArray[0];            
    }

    /**红颜脱衣 */
    public getWifeUndress():any[]{
        return this.otherInfoVo.wifeUndress;
    }

    public getOtherInfoVo() {
        return this.otherInfoVo;
    }

    public getCrosschatNum():number
    {
        return this.otherInfoVo.crosschatNum;
    }
    public getAutoFastNum():number
    {
        return this.otherInfoVo.autoFastNum;
    }
    public checkHasNewYear():boolean
    {   
        if (this.otherInfoVo && this.otherInfoVo.citySkinNewYear && this.otherInfoVo.citySkinNewYear > GameData.serverTime)
        {
            return true;
        }
        return false;
    }

     public checkHasHomeNewYear():boolean
    {   
        if (this.otherInfoVo && this.otherInfoVo.homeSkinNewYear && this.otherInfoVo.homeSkinNewYear > GameData.serverTime)
        {
            return true;
        }
        return false;
    }

    public getOpenFunUnlockList2():any{
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.unlockList2){
            return this.otherInfoVo.info.unlockList2;
        }
        return null;
    }

    public dispose():void
	{
		this.otherInfoVo = null;
		super.dispose();
    }
    
    
    
}