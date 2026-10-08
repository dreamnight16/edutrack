/**
 * Product-level constants that are not brand tokens.
 * The data files under src/data/** ship with the source tree, so the site has no
 * runtime data source: every number shown in the UI is derived from those files.
 */
export const SITE = {
  /** Mirrors the "version" field in package.json. */
  dataVersion: '0.1.0',
  name: '世界线',
  latinName: 'WORLDLINE',
} as const;

/** Shown wherever static, non-live data is presented. Never claims freshness. */
export const STATIC_DATA_NOTE =
  '数据来自仓库内置的 src/data 静态文件，随代码版本发布，不联网、不自动更新。';
