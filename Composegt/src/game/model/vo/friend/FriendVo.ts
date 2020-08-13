
/**
 *  好友vo
 * author yanyuling
 * date 2017/10/27
 * @class FriendVo
 */
class FriendVo extends BaseVo
{  
    public info:{uid:{send:number,rec:number}}[];
    public apply:{string:number}[];
    public receive:{string:number}[];
    public recnum:number = 0;
    public oinfo:{};
    public lastday:number=0
    public updated_at:number=0;

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        // let isNeedDispatch = false;
        
        let isRefreshRecvList = false;
        let isRefreshApplyList = false;
        let isRedreshFriendList = false;
        if(this.info && data.info != this.info  )
        {
             //刷新好友列表，数量发生变化时才刷新
            let len1 = Object.keys(data.info).length;
            let len2 = Object.keys(this.info).length;
            if(len1 != len2)
            {
                isRedreshFriendList = true;
            }
        }
        if(this.apply && data.apply != this.apply  )
        {
             //刷新推荐申请列表
            let len1 = Object.keys(data.apply).length;
            let len2 = Object.keys(this.apply).length;
            if(len1 != len2)
            {
                isRefreshApplyList = true;
            }
        }
        if(this.receive && this.receive != data.receive ){
            //刷新收到的申请列表
            let len1 = Object.keys(data.receive).length;
            let len2 = Object.keys(this.receive).length;
            if(len1 != len2)
            {
                isRefreshRecvList = true;
            }
        }
        for (var key in data) {
            this[key] = data[key];
        }
        if(isRefreshRecvList)
        {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE);
        }

        if(isRefreshApplyList)
        {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE);
        }
        if(isRedreshFriendList){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE);
        }
        
    }

    public dispose()
    {
        this.info = null;
        this.apply = null;
        this.receive = null;
        this.recnum = null;
        this.oinfo = null;
        this.lastday = null;
        this.updated_at = null;
    }
}