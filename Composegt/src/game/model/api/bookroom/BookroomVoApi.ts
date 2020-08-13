/**
 * 书院api
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVoApi
 */
class BookroomVoApi extends BaseVoApi
{
	private bookroomVo:BookroomVo;
	public constructor() 
	{
		super();
	}
    public getSeatNum()
    {

        return this.bookroomVo.pos_num;
    }

    public getOtherUsedSeatInfo(posId:number):any{
        let otherInfo = {};
        for(let key in this.bookroomVo.infoList){
            if(posId < Number(key)){
                otherInfo[key] = this.bookroomVo.infoList[key];
            }
        }
        return otherInfo

    }
    
    public getSeatInfoByPosId(posId:number)
    {
        let posinfo = this.bookroomVo.infoList[String(posId)];
        if( posinfo && posinfo.servantid){
            return posinfo;
        }
        return null;
    }
    public isStudying(servantId:string)
    {
        for (var key in this.bookroomVo.infoList) {
            if(this.bookroomVo.infoList[key].servantid == servantId)
                return true;
        }
        return false;
    }
    public getPosListInStudy()
    {
        let list = [];
        for (let key in this.bookroomVo.infoList) {
            let tmp = this.bookroomVo.infoList[key];
            if( tmp.et ){
                list.push(key);
            }
        }
        return list
    }
    public isBatchenable()
    {
        for (let key in this.bookroomVo.infoList) {
            let tmp = this.bookroomVo.infoList[key] ;
            if(tmp && tmp.et <= GameData.serverTime)
                return true;
        }
        return false;
    }

    public getSeatInfos()
    {
        return this.bookroomVo.infoList;
    }

    public checkNpcMessage():boolean
    {
        let len = Object.keys(this.getPosListInStudy()).length
        if(this.isBatchenable() || len < this.getSeatNum())
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

    public isBatchStudyEnable()
    {
        for (let key in this.bookroomVo.infoList)
        {
            if(this.bookroomVo.infoList[key].lastservant)
            {
                return true;
            }
                
        }
        return false;
    }
}