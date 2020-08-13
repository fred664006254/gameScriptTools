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

		export function getUnlockLvel(key:string):number
		{	
			let lv:number = null;
			for (let i = 0; i<=getMaxLevel(); i++)
			{
				if (getVipCfgByLevel(i)[key] == 1)
				{
					lv = i;
					break;
				}
			}
			return lv;
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

		/**
		 * 获取自动打boss vip等级
		 */
		export function getAutoBossLevel():number
		{
			let lv:number = null;
			for(let key in vipList)
			{
				let itemCfg:VipItemCfg=vipList[key];
				if(itemCfg.autoBoss)
				{
					lv = itemCfg.level;
					break;
				}
			}
			return lv;
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

		/**
		 * 获得门客的id
		 */
		public getServant:string;

		/**
		 * 获得红颜的id
		 */
		public getWife:string;

		/**
		 * 获得门客皮肤id
		 */
		public getServantSkin:string;

		/**
		 * 获得红颜皮肤的id
		 */
		public getWifeSkin:string;

		/**
		 * 获得奖励  充值额外奖励
		 */
		// public getPrize:string;
		public reward:string;
		
		/**
		 *  关卡boss自动战斗
		 */
		public autoBoss:number;

		private _extraRewardList:RewardItemVo[];

		public getServantSkinId():number{
			if (this.getServantSkin){
				let itemCfg = Config.ItemCfg.getItemCfgById(this.getServantSkin);
				if (itemCfg && itemCfg.servantSkinID){
					return itemCfg.servantSkinID;
				}
			}
			return null;
		}

		public get icon():string
		{
			return "vip_icon_"+this.level;
		}

		/**
		 *新版vip图标
		 */
		public get icon2():string
		{
			return "vip2_icon_"+this.level;
		}

		public get needGemLocalStr():string
		{	
			let vipStr:string ="";
			let vipDiscount:string ="";
			
			if(Api.switchVoApi.checkOpenVipTxtpop())
			{
				vipStr = "vipLevel_needGem_Desc";
				vipDiscount = "vipLevel_needGem_Desc_for_discount";
			}
			else
			{
				vipStr = "vipLevel_needGem_Desc2";
				vipDiscount = "vipLevel_needGem_Desc2_for_discount";
			}

			// vip折扣
			let acBaseVo = Api.acVoApi.checkIsVipDiscount();
			if (acBaseVo) {
				let itemcfg =null;
				if(acBaseVo.code ==1)
				{
					itemcfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1);
				}
				else
				{
					itemcfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 4);
				}
				return LanguageManager.getlocal(vipDiscount,[this.needGem.toString(), 
					itemcfg.vipList[this.level].needGem.toString()]);
			} else {
				return LanguageManager.getlocal(vipStr,[this.needGem.toString()]);
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

			if(Api.switchVoApi.checkOpenDinnerLimit()&&this.level==Config.DinnerCfg.getNeedVip())
			{
				localStr += "\n"+LanguageManager.getlocal("dinner_vip_limit_desc");
			}
			if(Api.switchVoApi.checkOpenFastFight())
			{
				if(3==this.level)
				{
					localStr += "\n"+LanguageManager.getlocal("fastFight_vip_desc");
				} 
			}
			//一键公务描述
			if(Api.switchVoApi.checkOpenOfficialbusiness())
			{	
				let needVip:number =GameConfig.config.affairCfg['needVip'];
				if(needVip===this.level)
				{
					localStr += "\n"+LanguageManager.getlocal("affter_vip_desc");
				} 
			}
			if(this.autoBoss)
			{	
				let descstr:string = LanguageManager.getlocal("vipunlock_autoboss");
				localStr += localStr?"\n"+descstr:descstr;
			} 
			if(this.dailySolider)
			{	
				let descstr:string = LanguageManager.getlocal("vipunlock_dailySolider");
				localStr += localStr?"\n"+descstr:descstr;
			} 
			if(this.dailyBoss)
			{	
				let descstr:string = LanguageManager.getlocal("vipunlock_dailyBoss");
				localStr += localStr?"\n"+descstr:descstr;
			} 
			if(this.allianceBoss)
			{	
				let descstr:string = LanguageManager.getlocal("vipunlock_allianceBoss");
				localStr += localStr?"\n"+descstr:descstr;
			} 
			if(Api.switchVoApi.checkOpenAllianceTask() && this.allianceTask)
			{	
				let descstr:string = LanguageManager.getlocal("vipunlock_allianceTask");
				localStr += localStr?"\n"+descstr:descstr;
			} 
			
			if (this.level == Config.SearchbaseCfg.needVip)
			{
				let descstr:string = LanguageManager.getlocal("vipunlock_autosearch");
				localStr += localStr?"\n"+descstr:descstr;
			}

			if (this.level == GameConfig.config.wifebaseCfg.needVip)
			{
				let descstr:string = LanguageManager.getlocal("vipunlock_wifebatch");
				localStr += localStr?"\n"+descstr:descstr;
			}

			if (this.level == GameConfig.config.bookroomCfg.needVip && Api.switchVoApi.checkOpenAutoStudy())
			{
				let descstr:string = LanguageManager.getlocal("vipunlock_studyonekey");
				localStr += localStr?"\n"+descstr:descstr;
			}
		 
			if(Api.switchVoApi.checkOpenWifeStatus()&&this.level==5)
			{
				localStr += "\n"+LanguageManager.getlocal("vipsealupdes");
			}
		 
			if (Api.switchVoApi.checkAutoMopup() && this.level == 6)
			{
				localStr += "\n"+LanguageManager.getlocal("challengeAutoFightUnlock");
			} 
			if (Api.switchVoApi.checkAutoAtkrace() && this.level == 6)
			{
				localStr += "\n"+LanguageManager.getlocal("atkraceAutoFightUnlock");
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
			if( Api.practiceVoApi.isPlayerPracticeEnable() && this.level > 2)
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