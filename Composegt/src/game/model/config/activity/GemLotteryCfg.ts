namespace Config
{
	export namespace AcCfg
	{
		export class GemLotteryCfg 
		{
                  public cost:number=100;    
                  public backPayNum:number = 0;

                  //抽奖转盘 --weight：权重  -luckValue：奖励幸运值 --reward：奖励
                  public  lotteryBasePool:{icon:number, weight:number,reward:string}[] = [];

                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                              if(key == "backpay"){
                                    this.backPayNum = GameData.formatRewardItem(data[key])[0].num;
                              }
                        }
                  }

                  public get  lotteryPoolLength()
                  {
                        let total = 0;
                        for (var key in this.lotteryBasePool) {
                              total ++;
                        }
                        return total;
                  }


	      }
	}
}