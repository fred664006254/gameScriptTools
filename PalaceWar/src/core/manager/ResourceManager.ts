/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceManager
 */
namespace ResourceManager
{
	let cacheDic:any={};

	/**
	 * 加载资源组
	 * @param groupName 资源组名
	 * @param onLoadComplete 加载完成回调
	 * @param onLoadProgress 加载进度回调
	 * @param onLoadThisObj 加载回调拥有对象
	 */
	export function loadGroup(groupName:string,onLoadComplete:Function,onLoadProgress:(e:RES.ResourceEvent)=>void,onLoadThisObj:any,onLoadError?:(e:RES.ResourceEvent)=>void):void
	{
		App.ResourceUtil.loadGroup(groupName,onLoadComplete,onLoadProgress,onLoadThisObj,onLoadError);
	}

	/**
	 * 按照配置key加载单个资源，需要先配置
	 * @param key 配置里面的key
	 * @param onLoadComplete 加载完成回调
	 * @param thisObj 加载回调拥有对象
	 */
	export function loadItem(key:string,onLoadComplete:(value?: any, key?: string)=>any,thisObj:any):void
	{
		App.ResourceUtil.loadItem(key,onLoadComplete,thisObj);
	}

	/**
	 * 使用url加载配置外单个资源
	 * @param url 需要加载的资源url
	 * @param onLoadComplete 加载完成回调
	 * @param thisObj 加载回调拥有对象
	 */
	export function loadItemByUrl(url:string,onLoadComplete:Function,thisObj:any,type?:string):void
	{
		App.ResourceUtil.loadItemByUrl(url,onLoadComplete,thisObj,type);
	}

	/**
	 * 加载混合资源
	 * @param resources 资源数组
	 * @param groups 资源组数组
	 * @param onResourceLoadComplete 加载完成回调
	 * @param onResourceLoadProgress 加载进度回调
	 * @param onResourceLoadTarget 加载回调拥有对象
	 */
	export function loadResources(resources:any[], groups:any[],onResourceLoadComplete:Function, onResourceLoadProgress:(e:RES.ResourceEvent)=>void, onResourceLoadTarget:any,onLoadError?:(e:RES.ResourceEvent)=>void):string
	{
		return App.ResourceUtil.loadResource(resources,groups,onResourceLoadComplete,onResourceLoadProgress,onResourceLoadTarget,onLoadError);
	}

	/**
	 * 获取资源
	 * @param key 
	 */
	export function getRes(key:string):any
	{
		let res=RES.getRes(key);
		if(res)
		{
			let scale9Cfg:string=Scale9gridCfg.getScale9gridCfg(key);
			if(scale9Cfg)
			{
				if(!res["scale9Grid"])
				{
					let rect:egret.Rectangle=egret.Rectangle.create();
					let scale9Arr=scale9Cfg.split(",");
					rect.setTo(Number(scale9Arr[0]),Number(scale9Arr[1]),Number(scale9Arr[2]),Number(scale9Arr[3]));
					let isScale9Grid:boolean=true;
					if(res instanceof egret.Texture)
					{
						if(rect.x+rect.width>res.textureWidth)
						{
							isScale9Grid=false;
							let tip:string=key+"scale9Grid宽度超过图片宽度，需修改";
							console.log(tip);
						}
						if(rect.y+rect.height>res.textureHeight)
						{
							isScale9Grid=false;
							let tip:string=key+"scale9Grid高度超过图片高度，需修改";
							console.log(tip);
						}
					}
					if(isScale9Grid)
					{
						res["scale9Grid"]=rect;
					}
				}
			}
		}
		return RES.getRes(key);
	}

	export function hasRes(key:string):boolean
	{
		let result:boolean=RES.hasRes(key);
		return result;
	}

	export function isItemLoaded(key:string):boolean
	{
		return ResourceManager.getRes(key)?true:false;
	}

	/**
	 * 释放对象
	 * @param name 配置文件中加载项的name属性或资源组名。
	 */
	export function destroyRes(name: string):void
	{
		App.ResourceUtil.destroyRes(name);
	}
	
	export function dispose():void
	{
	}
	
	/**
	 * 单线程加载资源，同时只有一个资源在加载，否则会影响其他功能界面加载
	 */
	export function autoLoadRes():void
	{

	}

	/**
	 * 检查资源key是否在对应组里面
	 */
	export function checkResInGroupByKey(resKey:string,groupName:string):boolean
	{
		return Boolean(App.ResourceUtil.checkResInGroupByKey(resKey,groupName));
	}

	/**
	 * 清理apk新包缓存
	 * @param isReload 清理完缓存后是否直接reload，默认直接reolad，否则传false
	 */
	export function clearDiskCache(isReload:boolean=true):void
	{
		App.ResourceUtil.clearDiskCache(isReload);
	}

	/**
	 * 根据资源key，资源组名 或者完整url删除资源的缓存
	 * @param res 资源key名或者资源组名或者第三方完整url
	 */
	export function deleteDiskCacheByKeyOrUrl(res:string):void
	{
		if(App.ResourceUtil.checkKeyIsGroup(res))
		{
			let groupData=App.ResourceUtil.getGroupResKeysByGroupName(res);
			if(groupData&&groupData.length>0)
			{
				let l=groupData.length;
				for(let i=0;i<l;i++)
				{
					let resurl:string = App.ResourceUtil.getResFullUrlByKey(groupData[i].name);
					if(resurl)
					{
						App.ResourceUtil.deleteDiskCacheByUrl(resurl);
						let sheetResUrl:string=App.ResourceUtil.getSheetResFullUrl(groupData[i].name);
						if(sheetResUrl)
						{
							App.ResourceUtil.deleteDiskCacheByUrl(sheetResUrl);
						}
					}
				}
			}
		}
		else
		{
			if(ResourceManager.hasRes(res))
			{
				let resurl:string = App.ResourceUtil.getResFullUrlByKey(res);
				if(resurl)
				{
					App.ResourceUtil.deleteDiskCacheByUrl(resurl);
					let sheetResUrl:string=App.ResourceUtil.getSheetResFullUrl(res);
					if(sheetResUrl)
					{
						App.ResourceUtil.deleteDiskCacheByUrl(sheetResUrl);
					}
				}
			}
			else
			{
				App.ResourceUtil.deleteDiskCacheByUrl(res);
			}
		}
		
	}
	
	/**
	 * 根据图片key名获取图集名称
	 */
	export function getAtlasByResName(resKey:string):string
	{
		return App.ResourceUtil.getAtlasByResName(resKey);
	}
}