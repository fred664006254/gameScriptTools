class AcDailyGiftVo extends AcBaseVo
{

    public ainfo: any[] = null;
    public freegift: number = null;
    //已经全部充值
    private isRecharged: boolean = false;
	 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO);

        let count = 0;
        let isR = true;
        for(let key in this.ainfo){
            count ++;
            if(this.ainfo[key] == 1)
            {

            } else {
                isR = false;
            }
        }
        if(count == 3){
            this.isRecharged = isR;
        } else {
            this.isRecharged = false;
        }

	}
	
	public get isShowRedDot(): boolean 
	{	

        if(this.freegift == 1){
            return true;
        } else {
            return false;
        }
        

	} 

 	/**重写
	 * 是否在活动开始期间，true：在期间，false:已结束或者未开始
	 */
	public get isShowIcon():boolean
	{
        
        if(this.freegift == 1 || !this.isRecharged)
		{
         
			return true;
		} 
   
		return false;
	}
	

	 
	public dispose():void 
	{ 
        this.ainfo = null;
        this.freegift = null;
        this.isRecharged = false;
	}
}