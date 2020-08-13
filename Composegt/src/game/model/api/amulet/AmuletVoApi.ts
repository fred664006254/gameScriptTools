class AmuletVoApi extends BaseVoApi
{
	private amuletVo : AmuletVo = null;

	public constructor() {
		super();
	}

    public getAmuListBySerId(serid:string){
        return this.amuletVo.getAmuListById(serid);
    }

    public getAmuletNum(serid:string,amuid?:string){
        let resNum = 0;
        let amu = this.amuletVo.getAmuListById(serid);
        if(amu ){
            if( amu[amuid]){
                resNum =  amu.amuletList[amuid].amuletNum || 0;
            }else{
                for (var key in amu.amuletList) {
                    if (amu.amuletList.hasOwnProperty(key)) {
                        resNum +=  amu.amuletList[key].amuletNum
                    }
                }
            }
            
        }
        return resNum;
    }
    public isServantOwnAmulate(serid:string)
    {
        let amu = this.amuletVo.getAmuListById(serid);
        if(!amu){
            return false;
        }
        let amuletList = amu.amuletList
        for (var key in amuletList) {
            if (amuletList.hasOwnProperty(key)) {
                var element = amuletList[key];
                if(element.amuletNum >= 0){
                    return true;
                }
            }
        }
    }
    public dispose():void
	{
		super.dispose();
	}
}