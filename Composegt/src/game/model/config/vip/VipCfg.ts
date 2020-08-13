namespace Config
{
	/**
	 * Vip配置
	 */
	export namespace VipCfg 
	{
		let vipList:Object={};
		let maxLevel:number;
		let vipLength:number;
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:VipItemCfg;
				if(!vipList.hasOwnProperty(String(key)))
				{
					vipList[String(key)]=new VipItemCfg();
				}
				itemCfg=vipList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.level=Number(key);
			}
		}

		/**
		 *  根据vip等级获取对应配置
		 * @param vipLevel vip等级 
		 */
		export function getVipCfgByLevel(vipLevel:number):VipItemCfg
		{
			return vipList[String(vipLevel)];
		}
		export function getvipLength(vipLevel:number):number
		{
			return vipLength;
		}
		/**
		 *  根据字段取解锁等级
		 * @param vipLevel vip等级 
		 */
		export function getVipUnlockByLevel(str:string=""):number
		{
			for(let key in vipList)
			{
				if(vipList[key][str])
				{
					return Number(key);  
				}
			} 
			return null;
		}	
		

		/**
		 * 获取最大VIP等级
		 */
		export function getMaxLevel():number
		{
			if(!maxLevel)
			{
				maxLevel=0;
				for(let key in vipList)
				{
					let itemCfg:VipItemCfg=vipList[key];
					if(maxLevel<itemCfg.level)
					{
						maxLevel = itemCfg.level
					}
				}
			}
			return maxLevel;
		}

		export function getbookRoomServant():number
		{
			for(let key in vipList)
			{
				let itemCfg:VipItemCfg=vipList[key];
				if(itemCfg.bookRoomServant)
				{
					return itemCfg.level
				}
			}
			return 0;
		}
	}
	export class VipItemCfg extends BaseItemCfg
	{
		/**
		 * vip等级
		 */
		public level:number;
		/**
		 * 所需充值额度  单位是元宝数量
		 */
		public needGem:number;
		/**
		 * 增加红颜生孩子概率   0.1代表10%
		 */
		public birthRatio:number;

		/**
		 * 寻访体力上限
		 */
		public maxStrength:number;

		/**
		 * 随机传唤精力上限
		 */
		public maxEnergy:number;

		/**
		 * 子嗣培养活力上限
		 */
		public maxVigour:number;

		/**
		 * 寻访每日的逆天转运免费次数
		 */
		public searchLuckFree:number;

		/**
		 * 天恩赐福每日次数
		 */
		public dailyLuckNum:number;

		/**
		 * 获得门客的id
		 */
		public getServant:string;

		/**
		 * 获得红颜的id
		 */
		public getWife:string;

		/**
		 * 获得奖励  充值额外奖励
		 */
		// public getPrize:string;
		public reward:string;

		/**
		 * 蛮族入侵的自动上阵  解锁所需VIP等级
		 */
		public dailySolider:number;
		/**
		 * 围剿蛮王的自动上阵  解锁所需VIP等级
		 */
		public dailyBoss:number;
		/**
		 * 帮会副本的自动上阵  解锁所需VIP等级
		 */
		public allianceBoss:number;
		/**
		 * 帮会任务的自动上阵  解锁所需VIP等级
		 */
		public allianceTask:number;

		public bookRoomServant:number = undefined;
		
		
		private _extraRewardList:RewardItemVo[];

		public get icon():string
		{
			return "vip_icon_"+this.level;
		}

		public get needGemLocalStr():string
		{
			// vip折扣
			if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
				return LanguageManager.getlocal("vipLevel_needGem_Desc_for_discount",[this.needGem.toString(), 
					Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[this.level].needGem.toString()]);
			} else {
				return LanguageManager.getlocal("vipLevel_needGem_Desc",[this.needGem.toString()]);
			}
		}
		public get birthRatioLocalStr():string
		{
			return LanguageManager.getlocal("vipLevel_birthRatio_Desc",[Math.round(this.birthRatio*100)+"%"]);
		}
		public get maxStrengthLocalStr():string
		{
			return LanguageManager.getlocal("vipLevel_maxStrength_Desc",[this.maxStrength.toString()]);
		}
		public get maxEnergyLocalStr():string
		{
			return LanguageManager.getlocal("vipLevel_maxEnergy_Desc",[this.maxEnergy.toString()]);
		}
		public get maxVigourLocalStr():string
		{
			return LanguageManager.getlocal("vipLevel_maxVigour_Desc",[this.maxVigour.toString()]);
		}
		public  get searchLuckLocalStr():string
		{
			return LanguageManager.getlocal("searchLuck_Desc",[this.searchLuckFree.toString()]);
		}
		public  dailyLuckLocalStr(i:number=0):string
		{
			return LanguageManager.getlocal("dailyLuck_Desc"+i,[this.dailyLuckNum.toString()]);
		}


		public get localStr():string
		{
			let localStr:string="";
			if(this.needGem)
			{
				localStr += this.needGemLocalStr;
			}  
			let needVip1 = Api.vipVoApi.getNeedVip("wifeStatusAuto"); 
			if(needVip1&&Api.switchVoApi.checkOpenWifeStatus()&&this.level==needVip1)
			{
				localStr += "\n"+LanguageManager.getlocal("vipsealupdes");
			}
			
			let needVip = Api.vipVoApi.getNeedVip("challengeAutoFight");
			// if (needVip&&Api.switchVoApi.checkAutoMopup() && this.level == needVip)
			if (needVip&&this.level == needVip)
			{
				localStr += "\n"+LanguageManager.getlocal("challengeAutoFightUnlock");
			} 
			
			if (Api.switchVoApi.checkAutoAtkrace() )
			{
				if (this.level == Api.vipVoApi.getNeedVip("autoAtkraceLock"))
				// if (  ((PlatformManager.checkIsWxSp() || PlatformManager.checkIsWanbaSp()) && this.level == 13 ) ||( !PlatformManager.checkIsWxSp() && this.level == 6 )  ) 
				{
					localStr += "\n"+LanguageManager.getlocal("atkraceAutoFightUnlock");
				}
			} 
			
			if(this.birthRatio)
			{
				localStr += localStr?"\n"+this.birthRatioLocalStr:this.birthRatioLocalStr;
			}
			if(this.maxStrength)
			{
				localStr += localStr?"\n"+this.maxStrengthLocalStr:this.maxStrengthLocalStr;
			}
			if(this.maxEnergy)
			{
				localStr += localStr?"\n"+this.maxEnergyLocalStr:this.maxEnergyLocalStr;
			}
			if(this.maxVigour)
			{
				localStr += localStr?"\n"+this.maxVigourLocalStr:this.maxVigourLocalStr;
			}
			if(this.searchLuckFree)
			{
				localStr += localStr?"\n"+this.searchLuckLocalStr:this.searchLuckFree;
			} 
			if( Api.practiceVoApi.isPlayerPracticeEnable() )
			{
				let vipAddV  = GameConfig.config.practicebaseCfg.vip[this.level];
				localStr += "\n"+LanguageManager.getlocal("practice_vipAdd2",[(vipAddV*100).toFixed(0)]);
			}
			if(this.dailyLuckNum)
			{
				for(var i:number=1;i<7;i++)
				{
					localStr += localStr?"\n"+this.dailyLuckLocalStr(i):this.dailyLuckNum;
				}
				
			} 

			if( PlatformManager.checkIsWxCfg() &&  this.level == 4){
				if(Api.switchVoApi.checkOpenBookRoomStrenthen() ){
					localStr = localStr+ "\n"+ LanguageManager.getlocal("vip4_bookroom_strenthen_OpenTxt");
				}

				if(Api.switchVoApi.checkOpenSearchGem() ){
					localStr = localStr+ "\n"+ LanguageManager.getlocal("vip4_search_gem_OpenTxt");
				}

				if(Api.switchVoApi.checkOpenManageTrader() ){
					localStr = localStr+ "\n"+ LanguageManager.getlocal("vip4_manage_trader_OpenTxt");
				}
			}
			
			return localStr;
		}

		public get extraRewardVoList():RewardItemVo[]
		{
			if(!this._extraRewardList)
			{
				if(this.reward)
				{
					this._extraRewardList=GameData.formatRewardItem(this.reward);
				}
			}
			return this._extraRewardList;
		}

		// public get extraRwardItemsList():BaseDisplayObjectContainer[]
		// {
		// 	if(this.reward)
		// 	{
		// 		return GameData.getRewardItemIcons(this.reward,true,true);
				
		// 	}
		// 	return null;
		// }

		public get searchLuckFreeLocalStr():string
		{
			return LanguageManager.getlocal("searchLuckFreeChangeDesc",[String(this.level),String(this.searchLuckFree)]);
		}
	}
}