
/**
 * 主界面解锁配置
 */
namespace MainUIUnLockCfg 
{
	/**
	 * 主界面解锁配置
	 */

	let mainUIUnLockCfg:any = {


		"newGuideStep":2,//新手引导完成时候解锁的

		"mainuiTop":1,//上面UI
		"mainuiBottom":1,//下面UI
		"mianuiGold":2,//银两
		"mianuiRecruit":1,//招募按钮
		"mianuiTask":1,//主线任务
		"mainuiSoldierFood":5,//士兵和粮草
		"mainuiChallenge":6,//关卡按钮
		"mainuiLevy":8,//征收
		"mainuiServant":7,//门客
		"mainuiCity":9,//进城

	};

	export function getMainUIUnLockCfg():any
	{
		return mainUIUnLockCfg;
	}

	export function getMainUIUnLockCfgByKey(key:string):any
	{
		return mainUIUnLockCfg[key];
	}
	export function getIsUnLockByKey(key:string):boolean
	{
		let unlockIndex = MainUI.getInstance().getUnlockIndex();
		return unlockIndex>=mainUIUnLockCfg[key];
	}
}