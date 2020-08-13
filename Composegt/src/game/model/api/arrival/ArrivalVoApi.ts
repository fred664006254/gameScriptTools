/**
 * 邮件api
 * author dmj
 * date 2017/11/04
 * @class arrivalVoApi
 */
class ArrivalVoApi extends BaseVoApi
{
	private arrivalVo:ArrivalVo;
	public constructor() 
	{
		super();
	}

	/**累积签到天数 */
	public getTotalSignDay():number
	{
		return this.arrivalVo.arrival_count;
	}

	/**
	 * 获取当前前后10天的奖励
	 * flag  0未领奖 1已领奖 2不能领取
	 */
	public getSignRewardList():{index:number,rewardList:Array<RewardItemVo>,flag:number}[]
	{
		 let rewardList:{index:number,rewardList:Array<RewardItemVo>,flag:number}[] = [];
		 let curIndex = this.getTotalSignDay();
		 let num = 10;
		 let startIndex = curIndex <= num? 1:curIndex - num;
		 let endIndex = curIndex + num;
		 let curFlag = this.arrivalVo.flag;
		 for(let i = startIndex;i <= endIndex;i++)
		 {
			let reward:{index:number,rewardList:Array<RewardItemVo>,flag:number} = <any>{};
			let rewardsId = Number((i-1)%21+1);
			var content:string = Config.ArrivalCfg.getContentByIndex(rewardsId);
			if(i==7 && !Api.switchVoApi.checkSignUp())
			{
				 content =content+"|"+Config.GameprojectCfg.sign7DayReward;//Config.ArrivalCfg.getContentByIndex(rewardsId);
			}
			else if(i==2 && !Api.switchVoApi.checkSignUp())
			{
				 content =content+"|"+Config.GameprojectCfg.sign2DayReward;
			}
			else if(i==3 && !Api.switchVoApi.checkSignUp())
			{
				 content =content+"|"+Config.GameprojectCfg.sign3DayReward;
			}
			else
			{
				content = Config.ArrivalCfg.getContentByIndex(rewardsId);
			}
		
			let rewardItemVoList = GameData.formatRewardItem(content);
			reward.index = i;
			reward.rewardList = rewardItemVoList;
			if(i < curIndex)
			{
				reward.flag = 1;
			}
			else
			{
				if(i == curIndex)
				{
					reward.flag = curFlag;
				}
				else
				{
					reward.flag = 2;
				}
			}
			rewardList.push(reward);
		 }
		 return rewardList;
	}

	/**
	 * 获取当前签到日在数组中的索引
	 */
	public getIndexByCurday():number
	{
		let curIndex = this.getTotalSignDay();
		let num = 10;
		let startIndex = curIndex <= num? curIndex:11;
		return startIndex;
	}

	/**
	 * 检查具体某一天的领取状态
	 * @param index 天数 
	 */
	public checkFlagByIndex(index:number):number
	{
		let curIndex = this.getTotalSignDay();
		let curFlag = this.arrivalVo.flag;
		if(curIndex > index)
		{
			return 1;
		}
		else if(index == curIndex)
		{
			return curFlag;
		}
			
		return 2;
	}

	/**
	 * 获取福利中心按钮排序配置
	 */
	public getFunctionCfgList():Array<string>
	{
		let arr:Array<string> = [];
		let funcItemList:{key:string,sortid:number}[] = [];
		let funcItem:{key:string,sortid:number} = <any>{};
		// 首冲
		// let payflag = Api.shopVoApi.getPayFlag();
		// funcItem = <any>{};
		// funcItem.key = "FirstRecharge";
		// funcItem.sortid = 999;
		// // if(payflag == 0)
		// // {
		// // 	funcItem.sortid = 21;
		// // }
		// // else
		// // {
		// // 	funcItem.sortid = 111;
		// // }
		// // if(!Api.switchVoApi.checkClosePay()&&Api.switchVoApi.checkWeChatFirstcharge()==false &&!PlatformManager.checkHideIconByIP())
		// if(!Api.switchVoApi.checkClosePay()&&Api.switchVoApi.checkWeChatFirstcharge()==false &&!PlatformManager.checkHideIconByIP())
		// {
		// 	funcItemList.push(funcItem);
		// }
		// if(payflag > 0 && Api.switchVoApi.checkOpenNewCharge())
		// {
		// 	let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
		// 	if(rechargeItemCfg)
		// 	{
		// 		let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
		// 		let itemVo2 = Api.shopVoApi.getPayInfoById2("g10");
		// 		if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime > GameData.serverTime ){
		// 			// if(itemVo1.isbuy == 0 || itemVo2.isbuy == 0)
		// 			// {
		// 				// 》》》》  换皮暂时关闭
		// 				// 充值礼包
		// 				// funcItem = <any>{};
		// 				// funcItem.key = "RechargeBox";
		// 				// funcItem.sortid = 10;
		// 				// if(!Api.switchVoApi.checkClosePay())
		// 				// {
		// 				// 	funcItemList.push(funcItem);
		// 				// }
		// 			   // 》》》》
		// 			// }
		// 		}
		// 	}
		// }




		// 签到
		funcItem = <any>{};
		funcItem.key = "Signin";
		funcItem.sortid = 11;
		funcItemList.push(funcItem);


		//豪门订阅
		if(Api.switchVoApi.checkOpenSpCard()){
			funcItem = <any>{};
			funcItem.key = "SpCard";
			let isBuySpCard = Api.shopVoApi.ifBuySpCard();
			if(isBuySpCard == false){
				funcItem.sortid = 21;
			} else {
				funcItem.sortid = 211;
			}
			
			funcItemList.push(funcItem);
		}


		// 月卡
		funcItem = <any>{};
		funcItem.key = "MonthCard";
		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		if(isBuyMonthCard == false)
		{
			funcItem.sortid = 31;
		}
		else
		{
			funcItem.sortid = 311;
		}
		if(!Api.switchVoApi.checkClosePay()&&!PlatformManager.checkHideIconByIP())
		{
			funcItemList.push(funcItem);
		}

		// 年卡
		funcItem = <any>{};
		funcItem.key = "YearCard";
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if(isBuyYearCard == false)
		{
			funcItem.sortid = 41;
		}
		else
		{
			funcItem.sortid = 411;
		}
		if(!Api.switchVoApi.checkClosePay()&&!PlatformManager.checkHideIconByIP())
		{
			funcItemList.push(funcItem);
		}
		//天恩赐福
		funcItem = <any>{};
		funcItem.key = "GodBless";
		funcItem.sortid = 51;

		if(!PlatformManager.checkHideIconByIP())
		{
			funcItemList.push(funcItem);
		}
		

	
		//实名认证
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			if(PlatformManager.getSpName()=="h5ios3kwan")
			{
				funcItem = <any>{};
				funcItem.key = "Realname";
				funcItem.sortid = 500;
				funcItemList.push(funcItem);
			}
		}
		
		// 1.5返利 
		if(Api.switchVoApi.checkOpenRechargeRebate())
		{
			funcItem = <any>{};
			funcItem.key = "Rebate";
			funcItem.sortid = 1000;
			funcItemList.push(funcItem);
		}
		


		// // 微信关注  officialwechat
		// if(PlatformManager.checkIs3KSp()==true)
		// {
		// 	funcItem = <any>{};
		// 	funcItem.key = "OfficialWeChat";
		// 	funcItem.sortid = 666;
		// 	funcItemList.push(funcItem);
		// }

		if(Api.switchVoApi.checkOpenShenhe()==false && PlatformManager.isSupportBindPhone() && !Api.otherInfoVoApi.isGetBindingReward())
		// if(!Api.otherInfoVoApi.isGetBindingReward())
		{
			//手机绑定
			funcItem = <any>{};
			funcItem.key = "Binding";
			funcItem.sortid = 611;
			funcItemList.push(funcItem);
		}

		//功能预览
		funcItem = <any>{};
		funcItem.key = "FunctionPreview";
		funcItem.sortid = 999;
		funcItemList.push(funcItem);
	

		if(Api.switchVoApi.checkopenQQqun())
		{
			//q	群福利
			funcItem = <any>{};
			funcItem.key = "Qgroup";
			funcItem.sortid = 998;
			funcItemList.push(funcItem);
		}
		
		if(Api.switchVoApi.checkopenAntiDeception())
		{
			//防诈骗
			funcItem = <any>{};
			funcItem.key = "antideception";
			funcItem.sortid = 1111;
			funcItemList.push(funcItem);
		}

		funcItemList.sort((a:{key:string,sortid:number},b:{key:string,sortid:number})=>{
					return a.sortid>b.sortid?1:0;
				});
		for(let i = 0;i<funcItemList.length;i++)
		{
			arr.push(funcItemList[i].key);
		}		
		
		return arr;
	}

	/**
	 * 是否显示红点
	 */
	public get isShowRedDot():boolean
	{
		if(this.arrivalVo.flag == 0)
		{
			return true;
		}
		return false;
	}

	public dispose():void
	{
		super.dispose();
	}
}