class AcRankActiveVo extends AcBaseVo
{
	public nextaid:string = "";
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		super.initData(data);
		if(data.nextaid)
		{
			this.nextaid = data.nextaid;
		}
	}

	/**
     *  获取冲榜活动产出资格的对应活动aid
     * */
    public getCrossActivityAid():string{
		let str = '';
		if(this.nextaid && this.nextaid !== ''){
			str = this.nextaid;
		}
        return str;
    }
}