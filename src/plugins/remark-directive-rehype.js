/**
 * Remark 插件 - 解析自定义指令节点并转换为 HAST 元素
 */

import { h } from "hastscript";
import { visit } from "unist-util-visit";

export function parseDirectiveNode() {
	return (tree, { _data }) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				// biome-ignore lint/suspicious/noAssignInExpressions: <check later>
				const data = node.data || (node.data = {});
				node.attributes = node.attributes || {};
				if (
					node.children.length > 0 &&
					node.children[0].data &&
					node.children[0].data.directiveLabel
				) {
					// 为节点添加标记，表示其拥有指令标签
					node.attributes["has-directive-label"] = true;
				}
				const hast = h(node.name, node.attributes);

				data.hName = hast.tagName;
				data.hProperties = hast.properties;
			}
		});
	};
}
