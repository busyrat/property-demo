import type { PropertyListItem, PropertyDetail } from '../models/Property';
import PropertyListings from '../mock/PropertyListings.json';
import PropertyDetails from '../mock/PropertyDetails.json';

// 模拟列表数据
const mockListItems: PropertyListItem[] = PropertyListings as PropertyListItem[];

// 模拟详情数据 - 独立接口
const mockDetails: { [key: number]: PropertyDetail } = PropertyDetails as { [key: number]: PropertyDetail };

export class PropertyRepository {
  // 获取列表接口
  static async getPropertyList(): Promise<PropertyListItem[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockListItems), 500);
    });
  }

  // 获取详情接口（独立接口）
  static async getPropertyDetail(id: number): Promise<PropertyDetail | undefined> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockDetails[id]);
      }, 700); // 详情接口响应稍慢
    });
  }
}