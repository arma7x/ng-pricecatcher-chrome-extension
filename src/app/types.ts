export interface SubmitGroupCategoryFormEvent {
  item_group: string,
  item_category: string,
}

export interface SubmitRegionTreeFormEvent {
  state: string,
  district: string,
  premise_type: string,
}

export interface ItemRow {
  item_code: number,
  item: string,
  unit: string,
  item_group: string,
  item_category: string,
}

export interface PriceRow {
  last_update: string,
  price: number,
  premise_code: number,
  premise: string,
  address: string,
  premise_type: string,
  state: string,
  district: string,
}

export interface PremiseRow {
  premise_code: number,
  premise: string,
  address: string,
  premise_type: string,
  state: string,
  district: string,
}

export interface ProductRow {
  item_code: number,
  item: string,
  unit: string,
  item_group: string,
  item_category: string,
  last_update: string,
  price: number,
}
