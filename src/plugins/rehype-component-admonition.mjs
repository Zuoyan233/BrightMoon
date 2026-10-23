/**
 * 提示框组件插件
 */

/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * 创建提示框组件
 *
 * @param {Object} properties - 组件属性
 * @param {string} [properties.title] - 可选标题
 * @param {('tip'|'note'|'important'|'caution'|'warning')} type - 提示框类型
 * @param {import('mdast').RootContent[]} children - 子元素
 * @returns {import('mdast').Parent} 创建的提示框组件
 */
export function AdmonitionComponent(properties, children, type) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
		);

	let label = null;
	if (properties?.["has-directive-label"]) {
		label = children[0]; // 第一个子元素是标签
		// biome-ignore lint/style/noParameterAssign: <check later>
		children = children.slice(1);
		label.tagName = "div"; // 将 <p> 标签改为 <div>
	}

	return h("blockquote", { class: `admonition bdm-${type}` }, [
		h("span", { class: "bdm-title" }, label ? label : type.toUpperCase()),
		...children,
	]);
}
