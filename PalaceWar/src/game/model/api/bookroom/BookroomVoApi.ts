/**
 * 书院api
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVoApi
 */
class BookroomVoApi extends BaseVoApi
{
	private bookroomVo:BookroomVo;
    private unlockArr:Array<any> =[];
	public constructor() 
	{
		super();
	}
    public getSeatNum()
    {
        return this.bookroomVo.pos_num;
    }
    public getSeatInfoByPosId(posId:number):any
    {
        if(this.bookroomVo.infoList[String(posId)]&&this.bookroomVo.infoList[String(posId)].et)
        {   
            return this.bookroomVo.infoList[String(posId)];
        } 
        return null;
    }

    public getInfoByPosId(posId:number)
    {
        let info = null;
        if(this.bookroomVo.infoList[String(posId)])
        {   
            info = this.bookroomVo.infoList[String(posId)];
        } 
        return info;
    }

    //普通席位 数组
    public getptBookList():Array<any>
    {
        let arr:Array<any> =[];
        for( var key in this.bookroomVo.infoList)
        {
            if(Number(key)>=0&&Number(key)<=100)
            {
                 arr.push(this.bookroomVo.infoList[key]);
            } 
        }
        return arr;
    }

    //月卡席位 数组
    public getMothBookList():Array<any>
    {
        let arr:Array<any> =[];
        for( var key in this.bookroomVo.infoList)
        {
            if(Number(key)>100&&Number(key)<200)
            {
                 arr.push(this.bookroomVo.infoList[key]);
            } 
        }
        return arr;
    }

    //道具卡席位 数组
    public getItemBookList():Array<any>
    {
        let arr:Array<any> =[];
        for( let key in this.bookroomVo.infoList)
        {
            if(Number(key)>300&&Number(key)<400)
            {
                arr.push(this.bookroomVo.infoList[key]);
            } 
        }
        arr.sort((a,b)=>{
            return b.lastet - a.lastet;
        });
        return arr;
    }

    //年卡席位 数组
    public getYearBookList():Array<any>
    {
        let arr:Array<any> =[];
        this.unlockArr = [];
        for( var key in this.bookroomVo.infoList)
        {
            if(Number(key)>200 && Number(key)<300)
            {
                if(this.bookroomVo.infoList[key].lock==0)
                {
                    arr.push(this.bookroomVo.infoList[key]);
                }
                else
                {
                    this.bookroomVo.infoList[key].year = 2;
                    this.unlockArr.push(this.bookroomVo.infoList[key]);
                } 
            } 
        }
        return arr;
    }

    //获取年卡未解锁的
    public getUnlockArr():Array<any>
    {
       return   this.unlockArr; 
    }

    //当前解锁的总的
    public getMaxleng():number
    {   
        var vipyearMaxnum  =0;
        if(Api.switchVoApi.checkOpenSeat())
        {
             vipyearMaxnum = this.bookroomVo.pos_num+this.geItemNum +this.getMonthNum+this.getYearlengh;
        }
        else
        {
             vipyearMaxnum =this.bookroomVo.pos_num+this.geItemNum;
        } 
       return   vipyearMaxnum;
    } 

    public isStudying(servantId:string)
    {
        for (var key in this.bookroomVo.infoList) {
            if(this.bookroomVo.infoList[key].et && this.bookroomVo.infoList[key].servantid == servantId)
                return true;
        }  
        return false;
    }
    public getPosListInStudy()
    {
        let keys:string[] = [];
        var list =null;
        if(Api.switchVoApi.checkOpenSeat())
        {
          list =this.bookroomVo.infoList
        }
        else
        {
          list =this.bookroomVo.base_pos;
        }

         for (var key in list) {
            if(list[key].et)
            {
                keys.push(key);
            }
        }  
        return keys
    }
    public isBatchenable()
    {
        for (let key in this.bookroomVo.infoList) {
            if(this.bookroomVo.infoList[key].et && this.bookroomVo.infoList[key].et <= GameData.serverTime)
                return true;
        }
        return false;
    }
    public checkNpcMessage():boolean
    {
         var len:number  =0; 
        len = Object.keys(this.getPosListInStudy()).length 
        if(this.isBatchenable() || len < this.getMaxleng())
        {
            return true;
        }
        return false;
    }
    /**
     * 是否有门客在学习
     */
    public isServantStudy():boolean
    {
        for (let key in this.bookroomVo.infoList)
        {
            if(this.bookroomVo.infoList[key].et)
            {
                return true;
            }
                
        }
        return false;
    }

    /**
     * 正在学习的门客数量
     */
    public getInStudyServantNum():number
    {
        let count = 0;
        for (let key in this.bookroomVo.infoList)
        {
            if(this.bookroomVo.infoList[key].et)
            {
                count += 1;
            }
                
        }
        return count;
    }

    /**
     * 当前可用席位列表
     */
    public getCanUseSeat(data:any):string[]{
        let arr:string[] = [];
        if (!data || data.length <= 0){
            return arr;
        }
        for (let i=0; i < data.length; i++){
            if (data[i]){
                // App.LogUtil.log("getCanUseSeat "+data[i].posId+" .item "+data[i].item+" year "+data[i].year+" month "+data[i].month);
                let roomInfo = this.getSeatInfoByPosId(Number(data[i].posId));
                if (data[i].year == 1 || data[i].month == 1){
                    if (data[i].item){
                        if (data[i].lastet - GameData.serverTime > 0 && (!roomInfo)){
                            arr.push(data[i]);
                        }
                    }
                    else{
                        if (!roomInfo){
                            arr.push(data[i]);
                        }
                    }
                }
                else if (data[i].year==0 && data[i].month == 0){
                    
                    if (data[i].item){
                        if (data[i].lastet - GameData.serverTime > 0 && (!roomInfo)){
                            arr.push(data[i]);
                        }
                    }
                    else{
                        if (!roomInfo){
                            arr.push(data[i]);
                        }
                    }
                } 
            }
        }
        App.LogUtil.log("getCanUseSeat "+arr.length);
        return arr;
    }

    /**
     * 上次所选的数据
     */
    public isLastSelectServant(id:string|number):boolean{
        let infoList = this.bookroomVo.infoList;
        for (let key in this.bookroomVo.infoList){
            if (infoList[key] && (!this.isStudying(String(id))) && infoList[key].lastservant == String(id)){
                return true;
            }
        }
        return false;
    }

    public getLastSelectServant(data:any):string[]{
        let arr:string[] = [];
        if (data && data.length > 0){
            for (let i=0; i < data.length; i++){
                if (this.isLastSelectServant(data[i])){
                    arr.push(data[i]);
                }
            }
        }
        App.LogUtil.log("getLastSelectServant "+arr.length);
        return arr;
    }

    //管家用
     public isLastSelectServant2(id:string|number):boolean{
        let infoList = this.bookroomVo.infoList;
        for (let key in this.bookroomVo.infoList){
            if (infoList[key] &&  infoList[key].lastservant == String(id)){
                return true;
            }
        }
        return false;
    }

    public getLastSelectServant2(data:any):string[]{
        let arr:string[] = [];
        if (data && data.length > 0){
            for (let i=0; i < data.length; i++){
                if (this.isLastSelectServant2(data[i])){
                    arr.push(data[i]);
                }
            }
        }
        App.LogUtil.log("getLastSelectServant "+arr.length);
        return arr;
    }

    //未学习的最靠前的门客
    public getNotInStudyServantIndex():number{
        let idList= Api.servantVoApi.getServantInfoIdListWithSort(2);
        let idList1=[];
        let idList2=[];
        for (let index = 0; index < idList.length; index++) {
            let key = idList[index];
            if (!this.isStudying(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
        if (idList1.length > 0){
            return 0;
        }
        return -1;
    }


    // 月卡解锁席位，购买＝2 else ＝0; 
    public get getMonthNum():number
    {
        return  this.bookroomVo.ismonthunlock();
    }

    // 道具卡解锁席位，购买＝2 else ＝0; 
    public get geItemNum():number
    {
        return  this.bookroomVo.itemLength();
    }

    //月卡时间
    public get getMonthTimer():number
    {
        return  this.bookroomVo.ismonthTimer();
    }

    //解锁的年卡数量
    public get getYearlengh():number
    {
        return  this.bookroomVo.yearLength();
    }


    //年卡最大数量席位
    public get vipyearMaxnum():number
    {
        return  this.bookroomVo.vipyearMaxnum();
    }

     //月卡最大数量席位
    public get vipmonthMaxnum():number
    {
        return  this.bookroomVo.vipmonthMaxnum();
     
    }

    //道具临时卡最大数量
    public get itemMaxnum():number
    {
        return  this.bookroomVo.itemMaxnum();
    }

     //道具临时卡时间
     public get getItemTimer():number
     {
         return  this.bookroomVo.isitemTimer();
     }

    public  needVip():number
    {
        return this.bookroomVo.getYearneedLevel();
    }
    
    
}