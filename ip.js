// script.js
function calculate() {
    const ipInput = document.getElementById('ipAddress').value;
    const subnetInput = parseInt(document.getElementById('subnetMask').value, 10);

    if (!validateIP(ipInput) || subnetInput < 1 || subnetInput > 32) {
        alert('Please enter a valid IP address and Subnet Mask!');
        return;
    }

    const ipBinary = ipToBinary(ipInput);
    const subnetMaskBinary = generateSubnetMask(subnetInput);

    const networkBinary = ipBinary.map((octet, i) => (octet & subnetMaskBinary[i]));
    const broadcastBinary = ipBinary.map((octet, i) => (octet | (~subnetMaskBinary[i] & 255)));

    document.getElementById('result-ip').textContent = ipInput;
    document.getElementById('result-mask').textContent = binaryToDecimal(subnetMaskBinary).join('.');
    document.getElementById('result-network').textContent = binaryToDecimal(networkBinary).join('.');
    document.getElementById('result-broadcast').textContent = binaryToDecimal(broadcastBinary).join('.');
    document.getElementById('result-hosts').textContent = calculateHosts(subnetInput);
}

function validateIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

function ipToBinary(ip) {
    return ip.split('.').map(octet => parseInt(octet, 10));
}

function generateSubnetMask(subnet) {
    const mask = [];
    for (let i = 0; i < 32; i++) {
        mask.push(i < subnet ? 1 : 0);
    }
    return [
        parseInt(mask.slice(0, 8).join(''), 2),
        parseInt(mask.slice(8, 16).join(''), 2),
        parseInt(mask.slice(16, 24).join(''), 2),
        parseInt(mask.slice(24, 32).join(''), 2),
    ];
}

function binaryToDecimal(binary) {
    return binary.map(octet => octet.toString(10));
}

function calculateHosts(subnet) {
    return Math.pow(2, 32 - subnet) - 2;
}
