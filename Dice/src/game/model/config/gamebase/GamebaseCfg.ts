namespace Config
{
    export namespace GamebaseCfg
    {

        //初始暴击伤害
        export let iniCrit:number;
        
        //暴击伤害最大值
        export let maxCrit:number;
        
        //钻石最大值
        export let maxGem:number;
        
        //金币最大值
        export let maxGold:number;
        
        //重命名所需钻石
        export let renameGem:number;
        
        //重置胜率所需钻石
        export let resetGem:number;
        
        //广告相关：每天可通过广告 重置 礼包商店 X 次
        export let advertise1:number;
        
        //广告相关：每天可通过广告 重置 礼包商店 的每次冷却时间  X  秒
        export let advertiseCD1:number;
        
        //广告相关：每天可通过广告 重置 每日商店 X 次
        export let advertise2:number;
        
        //广告相关：每天可通过广告 重置 每日商店 的每次冷却时间 X 秒
        export let advertiseCD2:number;
        
        //广告相关：每天可通过广告增幅对战模式 X 次
        export let advertise3:number;
        
        //广告相关：每天可通过广告增幅对战模式  的每次冷却时间 X 秒
        export let advertiseCD3:number;
        
        //广告相关：每天可通过广告增加协同次数 X 次
        export let advertise4:number;
        
        //广告相关：每天可通过广告增加协同次数 的每日冷却时间 X 秒
        export let advertiseCD4:number;
        
        //广告相关：每天可通过广告获得支援宝箱 X 次
        export let advertise5:number;
        
        //广告相关：每天可通过广告获得支援宝箱 的每次冷却时间 X 秒
        export let advertiseCD5:number;
        
        //广告相关：支援宝箱ID
        export let advertise6:string;
        
        //广告相关：对战增幅后，获胜后，可额外获得奖杯（score）
        export let advertise7:number;
        
        //广告相关：对战增幅后，获胜后，可额外获得金币（gold）
        export let advertise8:number;
        
        //广告相关：对战增幅后，获胜后，可额外获得钻石（gem）
        export let advertise9:number;

        //攻击速度（间隔）最小值  单位：秒
        export let maxAtkSpeed:number;

        //怪物移动速度降低最小值 最多降低 X%的移速
        export let maxDeSpeed:number;



        export function formatData(data:any):void
		{
			for(var key in data)
			{
				GamebaseCfg[key]=data[key];
            }
        }

    }
}