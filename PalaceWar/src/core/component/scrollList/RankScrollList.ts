/**
 * 排行榜滑动列表类 统一处理
 * author ycg
 * date 2020.6.4
 * @class RankScrollList
 * 适用于数据量较大 需要翻页显示的情况, 接口必传参数 index: 第几页的数据  
 * itemparam index: this._pageId 页之前的总数据个数=this._pageId * this._onePageNum, 也可不传，刷新item 序号需使用 
 */
class RankScrollList extends ScrollList{
    private _pageId:number = 1;
    private _oldPageId:number = 0;
    private _requestData:any = null;
    private _onePageNum:number = 100;
    private _isNeedRequest:boolean = false;
    private _isSlideDown:boolean = false; // 向下滑动 false 向上滑动
    private _requestFlag:BaseBitmap = null;
    private _isShowLastTip:boolean = true;

    public constructor(pageNum:number=20){
        super(pageNum);
    }

    public initRankScrollList(ScrollListItemClass:{new();},dataList:any[],scrollRect:egret.Rectangle,itemParam:any,isFill:boolean=false,useHeight:boolean=false, request:{requestType:string, requestParam:any}, onePageNum?:number):void{
        if (itemParam){
            itemParam["index"] = 0;
        }
        this.init(ScrollListItemClass,dataList,scrollRect,itemParam,isFill,useHeight);
        if (request){
            this._requestData = request;
            this.bindMoveCompleteCallback(this.moveComplete, this);
            this.bindChangeCallback(this.changeListCallback, this);
        }
        if (onePageNum && onePageNum > this._onePageNum){
            this._onePageNum = onePageNum;
        } 
    }

    //是否提示是最后一页
    public isShowLastTip(isShow:boolean):void{
        this._isShowLastTip = isShow;
    }

    /**
     * 滑动回调 监听事件
     */
    private changeListCallback():void{
        if (this._isNeedRequest){
            this.setRequestFlagPos();
            return;
        }
        this._oldPageId = this._pageId;
        if(this.checkIsAtButtomRequest()){
            this._isSlideDown = false;
            if (!this._isNeedRequest){
                this._pageId +=1;
                if (this._oldPageId != this._pageId){
                    this._isNeedRequest = true;
                    this.setRequestFlagPos();
                }
            }
        }
        else if(this.checkIsAtTopRequest()){
            this._isSlideDown = true;
            if (!this._isNeedRequest){
                this._pageId = Math.max(1, this._pageId - 1);
                if (this._oldPageId != this._pageId){
                    this._isNeedRequest = true;
                    this.setRequestFlagPos();
                } 
            }
        }    
    }

    /**外部调用请求接口需要重置 pageId */
    public setRequestIndex(index:number):void{
        this._pageId = index;
        this._oldPageId = this._pageId;
    }

    /**
     * 滑动完成回调
     */
    private moveComplete():void{
        App.LogUtil.log("movecomplete ");
        if (this._isNeedRequest){
            if (this._requestFlag){
                this._requestFlag.visible = false;
            }
            if(this._pageId != this._oldPageId){
                if (!this._requestData.requestParam["index"]){
                    this._requestData.requestParam["index"] = 1;
                }
                this._requestData.requestParam["index"] = this._pageId;
                
                this._oldPageId = this._pageId;
                NetManager.request(this._requestData.requestType, this._requestData.requestParam);
            }
            this._isNeedRequest = false;
        }
    }

    /**
     * 请求标记
     */
    public addRequestFlag():void{
        if (this._requestFlag){
            return ;
        }
        let content = this.parent;
        let flag = BaseBitmap.create("public_loadflag");
        flag.anchorOffsetX = flag.width/2;
        flag.anchorOffsetY = flag.height/2;
        content.addChild(flag);
        flag.visible = false;
        this._requestFlag = flag;
        egret.Tween.get(flag, {loop: true}).to({rotation: 360}, 1000);
    }

    /**
     * 刷新请求标记位置
     */
    private setRequestFlagPos():void{
        if (this._requestFlag && this._isNeedRequest){
            if (this._isSlideDown){
                let offY = Math.abs(this.scrollTop)/2 - this._requestFlag.height/2;
                if (offY <= 10 || this.scrollTop >= 0){
                    this._requestFlag.visible = false;
                }
                else{
                    this._requestFlag.visible = true;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._requestFlag, this, [0, offY]);
                }
            }
            else{
                let maxTop = this.getCurrMaxScrollTop();
                let offY = Math.abs(this.scrollTop - maxTop)/2 - this._requestFlag.height/2;
                if (maxTop <= 0 || offY <= 0 || this.scrollTop <= maxTop || this.scrollTop - maxTop < this._requestFlag.height + 10){
                    this._requestFlag.visible = false;
                }
                else{
                    this._requestFlag.visible = true;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._requestFlag, this, [0, offY]);
                }
            }
        }
    }

    /**
     * 刷新列表
     * @param data  datalist
     * @param param  item 参数
     */
    public refreshRankData(data:any, param?:any):void{
        if (data && data.length > 0){
            let stIndex = (this._pageId - 1)*this._onePageNum;
            if (param){
                if (!param["index"]){
                    param["index"] = 0;
                    stIndex = 0;
                }
                else{
                    let curIndex = param["index"];
                    if (curIndex > 0){
                        stIndex = (curIndex - 1)*this._onePageNum;
                    }
                }
                param["index"] = stIndex;
            }
            else{
                param = {index: stIndex};
            }
            App.LogUtil.log(" refresh "+param.index);
            this.refreshData(data, param);
            this.scrollTop = 0;
        }
        else{
            if (this._isShowLastTip && this._pageId != 1){
                App.CommonUtil.showTip(LanguageManager.getlocal("rankLastTip"));
            }
            this._pageId -= 1;
            if (this._pageId < 1){
                this._pageId = 1;
            }
        }
    }

    public dispose():void{
        if (this._requestFlag){
            egret.Tween.removeTweens(this._requestFlag);
        }
        this._pageId = 1;
        this._requestData = null;
        this._onePageNum = 0;
        this._isNeedRequest = false;
        this._oldPageId = 0;
        this._requestFlag = null;
        this._isSlideDown = false;

        super.dispose();
    }
}