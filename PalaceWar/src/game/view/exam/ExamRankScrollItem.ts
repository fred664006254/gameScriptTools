/**
  * 科举答题排行榜
  * author yangchengguo
  * date 2019.7.24
  * @class ExamRankScrollItem
  */
 class ExamRankScrollItem extends ScrollListItem
 {
 
     public constructor() 
     {
         super();
     }
     /**
      * 初始化itemview
      */
     public initItem(index:number,data:any):void
     {
         
         let itemIndex = index + 1;
         this.width = 516;
         this.height = 76;
         //排名
         let itemBgStr = "rankbg_"+String(itemIndex);
         if(itemIndex > 3)
         {
            this.height = 62;
            itemBgStr = "rankbg_4";
            let rankTF = ComponentManager.getTextField(String(itemIndex),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            rankTF.setPosition(this.x + 30 + 37 - rankTF.width/2, this.y + this.height/2 - rankTF.height/2);
            this.addChild(rankTF);
            if(data.uid == Api.playerVoApi.getPlayerID())
            {
                rankTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            }
         }
         else
         {  
            let numIcon = BaseLoadBitmap.create("rankinglist_rankn"+(String(itemIndex)));
            numIcon.width = 74;
            numIcon.height = 42;
            numIcon.setPosition(this.x + 30, this.y + this.height/2 - numIcon.height/2);
            this.addChild(numIcon);  
         }

        let itemBg = BaseLoadBitmap.create(itemBgStr);
        // itemBg.width = 608;
        this.addChild(itemBg);
         //名字
         let nameTF = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
         nameTF.setPosition(this.x + this.width / 2 - nameTF.width / 2 - 65,this.y + this.height / 2 - nameTF.height / 2);
         this.addChild(nameTF);
         //耗时
         let timeNum = Number(data.replytime) /1000;
         let timeTF = ComponentManager.getTextField(String(timeNum.toFixed(3)),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
         timeTF.setPosition(this.x + this.width / 2 - timeTF.width / 2 + 65, this.y + this.height / 2 - timeTF.height / 2);
         this.addChild(timeTF);
         //积分
         let scoreTF = ComponentManager.getTextField(data.score,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
         scoreTF.setPosition(this.x + this.width - scoreTF.width / 2 - 70 ,this.y + this.height / 2 - scoreTF.height / 2);
         this.addChild(scoreTF);
         //文本线
         let lineSp = BaseBitmap.create("public_line1");
         lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,this.y + this.height - lineSp.height);
         this.addChild(lineSp);
 
         if(data.uid == Api.playerVoApi.getPlayerID())
         {
            nameTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            scoreTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            timeTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
         }
 
     }
 
     public getSpaceY():number
     {
        return 5;
     }
     
     public dispose():void
     {
         
         super.dispose();
     }
 }