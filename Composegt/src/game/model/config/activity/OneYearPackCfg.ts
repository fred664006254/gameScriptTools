namespace Config
{
	export namespace AcCfg
	{
		export class OneYearPackCfg 
		{
                  public cost:number=100;
            
                  //第一次幸运值达到x时可以兑换红颜皮肤礼包
                  public luckExchangePoint1:number=50;
                  
                  ///1次满值之后幸运值达到x时可以兑换红颜皮肤礼包
                  public luckExchangePoint2:number=100;
                  
                  //幸运值的上限
                  public luckMax:number=999999;
                  
                  //红颜皮肤礼包ID
                  public packItemID:number=6031;
                  
                  //抽奖道具ID
                  public drawItemID:number=6032;
            
                  //皮肤预览
                  //wifeSkinID：皮肤预览的皮肤ID
                  public  wifeSkinShow:{wifeSkinID:string}[] = [];

                  //抽奖转盘 --weight：权重  -luckValue：奖励幸运值 --reward：奖励
                  public  lotteryPool:{weight:number,luckValue:number,reward:string}[] = [];

                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                        }
                  }

                  public getSelectItemIdx(reward) : number{
                        let index = 0;
                        for(let i in this.lotteryPool){
                              let unit = this.lotteryPool[i];
                              if(unit.reward == reward){
                                    index = Number(i);
                                    break;
                              }
                        }
                        return index;
                  }

                  public get  lotteryPoolLength()
                  {
                        let total = 0;
                        for (var key in this.lotteryPool) {
                              total ++;
                        }
                        return total;
                  }


	      }
	}
}