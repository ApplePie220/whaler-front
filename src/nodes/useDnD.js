import { Position, useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'

// const { updateNode, onConnect, addEdges, getNodes } = useVueFlow()

let id = 0

/**
 * @returns {string} - A unique id.
 */
function getId() {
    return `dndnode_${id++}`
}

let label_node = null;

const state = {
    /**
     * The type of the node being dragged.
     */
    draggedType: ref(null),
    isDragOver: ref(false),
    isDragging: ref(false),
}

export default function useDragAndDrop() {
    const { draggedType, isDragOver, isDragging } = state

    const { addNodes, screenToFlowCoordinate, findNode, onNodesInitialized, updateNode, addEdges, onConnect, getNodes } = useVueFlow()

    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    })

    function onDragStart(event, type, label) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type)
            event.dataTransfer.effectAllowed = 'move'
        }
        label_node = label
        draggedType.value = type
        isDragging.value = true

        document.addEventListener('drop', onDragEnd)
    }

    /**
     * Handles the drag over event.
     *
     * @param {DragEvent} event
     */
    function onDragOver(event) {
        event.preventDefault()

        if (draggedType.value) {
            isDragOver.value = true

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
        }
    }

    function onDragLeave() {
        isDragOver.value = false
    }

    function onDragEnd() {
        isDragging.value = false
        isDragOver.value = false
        draggedType.value = null
        label_node = null
        document.removeEventListener('drop', onDragEnd)
    }



    /**
     * Handles the drop event.
     *
     * @param {DragEvent} event
     */
    function onDrop(event) {
        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        })

        const nodeId = getId()

        const newNode = {
            id: nodeId,
            type: draggedType.value,
            position,
            label: label_node,
            data : { toolbarPosition: Position.Left},
            parameters: ''
        }

        /**
         * Align node position after drop, so it's centered to the mouse
         *
         * We can hook into events even in a callback, and we can remove the event listener after it's been called.
         */
        const { off } = onNodesInitialized(() => {
            updateNode(nodeId, (node) => ({
                position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
            }))

            off()
        })

        addNodes(newNode)
    }

    function updateParams (idnode, localparams) {
        console.log(idnode)
        updateNode(idnode, (node) => ({
            parameters: localparams
        }))
    }

    function onConnecting(connection) {
        const sourceNode = findNode(connection.source);
        const targetNode = findNode(connection.target);

        if (sourceNode.type === 'input' && targetNode.type === 'output') {
            // Prevent connecting input directly to output
            console.error('Нельзя напрямую подключать блок FROM с блоками завершения без определения промежуточных блоков.');
            return; // Do not call addEdges
        }

        addEdges(connection);
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
        updateParams,
        onConnecting
    }
}
