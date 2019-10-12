
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function createEventDispatcher() {
        const component = current_component;
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    var url = 'bjectSymhasOwnProp-0123456789ABCDEFGHIJKLMNQRTUVWXYZ_dfgiklquvxz';

    /**
     * Generate URL-friendly unique ID. This method use non-secure predictable
     * random generator with bigger collision probability.
     *
     * @param {number} [size=21] The number of symbols in ID.
     *
     * @return {string} Random string.
     *
     * @example
     * const nanoid = require('nanoid/non-secure')
     * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
     *
     * @name nonSecure
     * @function
     */
    var nonSecure = function (size) {
      size = size || 21;
      var id = '';
      while (0 < size--) {
        id += url[Math.random() * 64 | 0];
      }
      return id
    };

    /* src\components\TodoItem.svelte generated by Svelte v3.12.1 */

    const file = "src\\components\\TodoItem.svelte";

    // (36:6) {:else}
    function create_else_block_1(ctx) {
    	var t_value = ctx.data.text + "", t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.data) && t_value !== (t_value = ctx.data.text + "")) {
    				set_data_dev(t, t_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block_1.name, type: "else", source: "(36:6) {:else}", ctx });
    	return block;
    }

    // (29:6) {#if isEdit}
    function create_if_block_1(ctx) {
    	var input, dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			input.autofocus = true;
    			add_location(input, file, 29, 8, 387);

    			dispose = [
    				listen_dev(input, "input", ctx.input_input_handler),
    				listen_dev(input, "keypress", ctx.clickEnter)
    			];
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			set_input_value(input, ctx.data.text);

    			input.focus();
    		},

    		p: function update(changed, ctx) {
    			if (changed.data && (input.value !== ctx.data.text)) set_input_value(input, ctx.data.text);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(input);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1.name, type: "if", source: "(29:6) {#if isEdit}", ctx });
    	return block;
    }

    // (48:8) {:else}
    function create_else_block(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Edit");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block.name, type: "else", source: "(48:8) {:else}", ctx });
    	return block;
    }

    // (46:8) {#if isEdit}
    function create_if_block(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Save");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(46:8) {#if isEdit}", ctx });
    	return block;
    }

    function create_fragment(ctx) {
    	var li, div2, div0, t0, div1, button0, button0_data_id_value, t1, button1, t2, button1_data_id_value, dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.isEdit) return create_if_block_1;
    		return create_else_block_1;
    	}

    	var current_block_type = select_block_type(null, ctx);
    	var if_block0 = current_block_type(ctx);

    	function select_block_type_1(changed, ctx) {
    		if (ctx.isEdit) return create_if_block;
    		return create_else_block;
    	}

    	var current_block_type_1 = select_block_type_1(null, ctx);
    	var if_block1 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div2 = element("div");
    			div0 = element("div");
    			if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			button0 = element("button");
    			if_block1.c();
    			t1 = space();
    			button1 = element("button");
    			t2 = text("Remove");
    			add_location(div0, file, 27, 4, 354);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-id", button0_data_id_value = ctx.data.id);
    			add_location(button0, file, 40, 6, 588);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "data-id", button1_data_id_value = ctx.data.id);
    			add_location(button1, file, 51, 6, 785);
    			add_location(div1, file, 39, 4, 576);
    			attr_dev(div2, "class", "content svelte-n3nv7i");
    			add_location(div2, file, 26, 2, 328);
    			add_location(li, file, 25, 0, 321);

    			dispose = [
    				listen_dev(button0, "click", ctx.toggleEdit),
    				listen_dev(button1, "click", ctx.remove)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div2);
    			append_dev(div2, div0);
    			if_block0.m(div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, button0);
    			if_block1.m(button0, null);
    			append_dev(div1, t1);
    			append_dev(div1, button1);
    			append_dev(button1, t2);
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type === (current_block_type = select_block_type(changed, ctx)) && if_block0) {
    				if_block0.p(changed, ctx);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);
    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			}

    			if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(changed, ctx))) {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);
    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(button0, null);
    				}
    			}

    			if ((changed.data) && button0_data_id_value !== (button0_data_id_value = ctx.data.id)) {
    				attr_dev(button0, "data-id", button0_data_id_value);
    			}

    			if ((changed.data) && button1_data_id_value !== (button1_data_id_value = ctx.data.id)) {
    				attr_dev(button1, "data-id", button1_data_id_value);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(li);
    			}

    			if_block0.d();
    			if_block1.d();
    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { data, remove } = $$props;

      let isEdit = false;

      function toggleEdit() {
        $$invalidate('isEdit', isEdit = !isEdit);
      }

      function clickEnter({ keyCode }) {
        if (keyCode === 13) {
          toggleEdit();
        }
      }

    	const writable_props = ['data', 'remove'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<TodoItem> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		data.text = this.value;
    		$$invalidate('data', data);
    	}

    	$$self.$set = $$props => {
    		if ('data' in $$props) $$invalidate('data', data = $$props.data);
    		if ('remove' in $$props) $$invalidate('remove', remove = $$props.remove);
    	};

    	$$self.$capture_state = () => {
    		return { data, remove, isEdit };
    	};

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate('data', data = $$props.data);
    		if ('remove' in $$props) $$invalidate('remove', remove = $$props.remove);
    		if ('isEdit' in $$props) $$invalidate('isEdit', isEdit = $$props.isEdit);
    	};

    	return {
    		data,
    		remove,
    		isEdit,
    		toggleEdit,
    		clickEnter,
    		input_input_handler
    	};
    }

    class TodoItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["data", "remove"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "TodoItem", options, id: create_fragment.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.data === undefined && !('data' in props)) {
    			console.warn("<TodoItem> was created without expected prop 'data'");
    		}
    		if (ctx.remove === undefined && !('remove' in props)) {
    			console.warn("<TodoItem> was created without expected prop 'remove'");
    		}
    	}

    	get data() {
    		throw new Error("<TodoItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<TodoItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get remove() {
    		throw new Error("<TodoItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set remove(value) {
    		throw new Error("<TodoItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TodoList.svelte generated by Svelte v3.12.1 */

    const file$1 = "src\\components\\TodoList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.data = list[i];
    	return child_ctx;
    }

    // (23:2) {#each items as data}
    function create_each_block(ctx) {
    	var current;

    	var todoitem = new TodoItem({
    		props: { data: ctx.data, remove: ctx.remove },
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			todoitem.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(todoitem, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var todoitem_changes = {};
    			if (changed.items) todoitem_changes.data = ctx.data;
    			todoitem.$set(todoitem_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(todoitem.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(todoitem.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(todoitem, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(23:2) {#each items as data}", ctx });
    	return block;
    }

    function create_fragment$1(ctx) {
    	var ul, current;

    	let each_value = ctx.items;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(ul, "class", "list svelte-1t1eo0y");
    			add_location(ul, file$1, 21, 0, 331);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.items || changed.remove) {
    				each_value = ctx.items;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(ul);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	

      let { items } = $$props;

      const dispatch = createEventDispatcher();

      function remove({ target }) {
        dispatch('remove', target.dataset.id);
      }

    	const writable_props = ['items'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<TodoList> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    	};

    	$$self.$capture_state = () => {
    		return { items };
    	};

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    	};

    	return { items, remove };
    }

    class TodoList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["items"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "TodoList", options, id: create_fragment$1.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.items === undefined && !('items' in props)) {
    			console.warn("<TodoList> was created without expected prop 'items'");
    		}
    	}

    	get items() {
    		throw new Error("<TodoList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<TodoList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Todo.svelte generated by Svelte v3.12.1 */

    const file$2 = "src\\components\\Todo.svelte";

    // (49:2) {:else}
    function create_else_block$1(ctx) {
    	var current;

    	var todolist = new TodoList({
    		props: { items: ctx.items },
    		$$inline: true
    	});
    	todolist.$on("remove", ctx.removeItem);

    	const block = {
    		c: function create() {
    			todolist.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(todolist, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var todolist_changes = {};
    			if (changed.items) todolist_changes.items = ctx.items;
    			todolist.$set(todolist_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(todolist.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(todolist.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(todolist, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block$1.name, type: "else", source: "(49:2) {:else}", ctx });
    	return block;
    }

    // (47:2) {#if items.length < 1}
    function create_if_block$1(ctx) {
    	var p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "You don't have any tasks";
    			add_location(p, file$2, 47, 4, 779);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(p);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$1.name, type: "if", source: "(47:2) {#if items.length < 1}", ctx });
    	return block;
    }

    function create_fragment$2(ctx) {
    	var div1, h1, t1, div0, input_1, t2, button, t4, current_block_type_index, if_block, current, dispose;

    	var if_block_creators = [
    		create_if_block$1,
    		create_else_block$1
    	];

    	var if_blocks = [];

    	function select_block_type(changed, ctx) {
    		if (ctx.items.length < 1) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(null, ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Todo List";
    			t1 = space();
    			div0 = element("div");
    			input_1 = element("input");
    			t2 = space();
    			button = element("button");
    			button.textContent = "Add";
    			t4 = space();
    			if_block.c();
    			add_location(h1, file$2, 31, 2, 511);
    			attr_dev(input_1, "type", "text");
    			add_location(input_1, file$2, 33, 4, 542);
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 39, 4, 657);
    			add_location(div0, file$2, 32, 2, 532);
    			add_location(div1, file$2, 30, 0, 503);

    			dispose = [
    				listen_dev(input_1, "input", ctx.input_1_input_handler),
    				listen_dev(input_1, "keypress", ctx.clickEnter),
    				listen_dev(button, "click", ctx.addItem)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, input_1);

    			set_input_value(input_1, ctx.text);

    			ctx.input_1_binding(input_1);
    			append_dev(div0, t2);
    			append_dev(div0, button);
    			append_dev(div1, t4);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.text && (input_1.value !== ctx.text)) set_input_value(input_1, ctx.text);

    			var previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(changed, ctx);
    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(changed, ctx);
    			} else {
    				group_outros();
    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});
    				check_outros();

    				if_block = if_blocks[current_block_type_index];
    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}
    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div1);
    			}

    			ctx.input_1_binding(null);
    			if_blocks[current_block_type_index].d();
    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

      let items = [];
      let text = '';
      let input = null;

      function addItem() {
        const item = {
          id: nonSecure(),
          text,
        };

        $$invalidate('items', items = [item].concat(items));
        $$invalidate('text', text = '');
        input.focus();
      }

      function removeItem({ detail: id }) {
        $$invalidate('items', items = items.filter(item => item.id !== id));
      }

      function clickEnter({ keyCode }) {
        if (keyCode === 13) {
          addItem();
        }
      }

    	function input_1_input_handler() {
    		text = this.value;
    		$$invalidate('text', text);
    	}

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('input', input = $$value);
    		});
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    		if ('input' in $$props) $$invalidate('input', input = $$props.input);
    	};

    	return {
    		items,
    		text,
    		input,
    		addItem,
    		removeItem,
    		clickEnter,
    		input_1_input_handler,
    		input_1_binding
    	};
    }

    class Todo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Todo", options, id: create_fragment$2.name });
    	}
    }

    /* src\App.svelte generated by Svelte v3.12.1 */

    const file$3 = "src\\App.svelte";

    function create_fragment$3(ctx) {
    	var header, t0, main, t1, footer, current;

    	var todo = new Todo({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			t0 = space();
    			main = element("main");
    			todo.$$.fragment.c();
    			t1 = space();
    			footer = element("footer");
    			add_location(header, file$3, 11, 0, 141);
    			attr_dev(main, "class", "main svelte-f9kgaf");
    			add_location(main, file$3, 12, 0, 152);
    			add_location(footer, file$3, 15, 0, 191);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(todo, main, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, footer, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(todo.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(todo.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(header);
    				detach_dev(t0);
    				detach_dev(main);
    			}

    			destroy_component(todo);

    			if (detaching) {
    				detach_dev(t1);
    				detach_dev(footer);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$3, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$3.name });
    	}
    }

    const app = new App({
      target: document.getElementById('root'),
      props: {},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
