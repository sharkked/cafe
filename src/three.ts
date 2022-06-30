import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh, LineBasicMaterial, Vector3, BufferGeometry, Line
} from "three";

const scene = new Scene();
const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const g_cube = new BoxGeometry(1, 1, 1);
const m_cube = new MeshBasicMaterial({ color: 0xff00a8 });
const cube = new Mesh(g_cube, m_cube);

const points = [];
points.push(new Vector3(-10, 0, 0));
points.push(new Vector3(0, 10, 0));
points.push(new Vector3(10, 0, 0));
const g_line = new BufferGeometry().setFromPoints(points);
const m_line = new LineBasicMaterial({ color: 0xff00a8 });
const line = new Line(g_line, m_line);

scene.add(line);
scene.add(cube);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

export function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}